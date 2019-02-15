import React, { Component } from 'react'
import partyColors from '../styles/colors.scss'
import * as d3 from 'd3';


class Attendance extends Component {

    constructor(props) {
        super(props);
        this.createGauge = this.createGauge.bind(this)
      }
    
      componentDidMount() {
        const { data } = this.props;
        this.createGauge(65, "M")
      }
      componentWillReceiveProps({ data }) {
        this.createGauge(65, "M")
      }

    
    
    createGauge(value, partyID) {
        var elementId = "attendanceGauge";
        
        // ------------Gauge parameters-------------
        var minValue = 0; // The gauge minimum value.
        var maxValue = 100; // The gauge maximum value.
        var circleThickness = 0.05; // The outer circle thickness as a percentage of it's radius.
        var circleFillGap = 0.05; // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
        var waveHeight = 0.05; // The wave height as a percentage of the radius of the wave circle.
        var waveCount = 1; // The number of full waves per width of the wave circle.
        var waveRiseTime = 1000; // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
        var waveAnimateTime = 18000; // The amount of time in milliseconds for a full wave to enter the wave circle.
        var waveRise = true; // Control if the wave should rise from 0 to it's full height, or start at it's full height.
        var waveHeightScaling = true; // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
        var waveAnimate = true; // Controls if the wave scrolls or is static.
        var waveOffset = 0; // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
        var textVertPosition = 0.5; // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
        var textSize = 1; // The relative height of the text to display in the wave circle. 1 = 50%
        var valueCountUp = true; // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
        var displayPercent = true; // If true, a % symbol is displayed after the value.
        // ----------------Colors-------------------
        var circleFill = '#fff'; // The fill color of the circle.  Can be set to "transparent"
        var waveTextColor = "white"; // The color of the value text when the wave overlaps it.
        var circleColor = partyColors["party" + partyID]; // The color of the outer circle.
        var textColor = circleColor; // The color of the value text when the wave does not overlap it.
        var waveColor = circleColor; // The color of the fill wave.
        // -----------------------------------------
    
        var gauge = d3.select("#" + elementId);
        var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height")))/2;
        var locationX = parseInt(gauge.style("width"))/2 - radius;
        var locationY = parseInt(gauge.style("height"))/2 - radius;
        var fillPercent = Math.max(minValue, Math.min(maxValue, value))/maxValue;
    
        var waveHeightScale;
        if(waveHeightScaling){
            waveHeightScale = d3.scaleLinear()
                .range([0,waveHeight,0])
                .domain([0,50,100]);
        } else {
            waveHeightScale = d3.scaleLinear()
                .range([waveHeight,waveHeight])
                .domain([0,100]);
        }
    
        var textPixels = (textSize*radius/2);
        var textFinalValue = parseFloat(value).toFixed(2);
        var textStartValue = valueCountUp?minValue:textFinalValue;
        var percentText = displayPercent?"%":"";
        circleThickness = circleThickness * radius;
        circleFillGap = circleFillGap * radius;
        var fillCircleMargin = circleThickness + circleFillGap;
        var fillCircleRadius = radius - fillCircleMargin;
        var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
    
        var waveLength = fillCircleRadius*2/waveCount;
        var waveClipCount = 1+waveCount;
        var waveClipWidth = waveLength*waveClipCount;
    
        // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
        var textRounder = function(value){ return Math.round(value); };
        if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
            textRounder = function(value){ return parseFloat(value).toFixed(1); };
        }
        if(parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))){
            textRounder = function(value){ return parseFloat(value).toFixed(2); };
        }
    
        // Data for building the clip wave area.
        var data = [];
        for(var i = 0; i <= 40*waveClipCount; i++){
            data.push({x: i/(40*waveClipCount), y: (i/(40))});
        }
    
        // Scales for drawing the outer circle.
        var gaugeCircleX = d3.scaleLinear().range([0,2*Math.PI]).domain([0,1]);
        var gaugeCircleY = d3.scaleLinear().range([0,radius]).domain([0,radius]);
    
        // Scales for controlling the size of the clipping path.
        var waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
        var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);
    
        // Scales for controlling the position of the clipping path.
        var waveRiseScale = d3.scaleLinear()
            // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
            // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
            // circle at 100%.
            .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
            .domain([0,1]);
        var waveAnimateScale = d3.scaleLinear()
            .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
            .domain([0,1]);
    
        // Scale for controlling the position of the text within the gauge.
        var textRiseScaleY = d3.scaleLinear()
            .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
            .domain([0,1]);
    
        // Center the gauge within the parent SVG.
        var gaugeGroup = gauge.append("g")
            .attr('transform','translate('+locationX+','+locationY+')');
    
        // Draw the fill circle
        gaugeGroup.append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", radius)
            .attr("class", "fill")
            .style("fill", circleFill);
    
        // Draw the outer circle.
        var gaugeStrokeArc = d3.arc()
            .startAngle(gaugeCircleX(0))
            .endAngle(gaugeCircleX(1))
            .outerRadius(gaugeCircleY(radius))
            .innerRadius(gaugeCircleY(radius-circleThickness));
        gaugeGroup.append("path")
            .attr("d", gaugeStrokeArc)
            .attr("class", "stroke")
            .style("fill", circleColor)
            .attr('transform','translate('+radius+','+radius+')');
    
        // Text where the wave does not overlap.
        var text1 = gaugeGroup.append("text")
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", textColor)
            .attr('transform','translate('+radius+','+textRiseScaleY(textVertPosition)+')');
    
        // The clipping wave area.
        var clipArea = d3.area()
            .x(function(d) { return waveScaleX(d.x); } )
            .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*waveOffset*-1 + Math.PI*2*(1-waveCount) + d.y*2*Math.PI));} )
            .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
        var waveGroup = gaugeGroup.append("defs")
            .append("clipPath")
            .attr("id", "clipWave" + elementId);
        var wave = waveGroup.append("path")
            .datum(data)
            .attr("d", clipArea)
            .attr("T", 0);
    
        // The inner circle with the clipping wave attached.
        var fillCircleGroup = gaugeGroup.append("g")
            .attr("clip-path", "url(#clipWave" + elementId + ")");
        fillCircleGroup.append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", fillCircleRadius)
            .style("fill", waveColor);
    
        // Text where the wave does overlap.
        var text2 = fillCircleGroup.append("text")
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", waveTextColor)
            .attr('transform','translate('+radius+','+textRiseScaleY(textVertPosition)+')');
    
        // Make the value count up.
        if(valueCountUp){
            var textTween = function(){
                var i = d3.interpolate(this.textContent, textFinalValue);
                var myText = d3.select(this);
                return function(t) {
                    myText.text(textRounder(i(t)) + percentText);
                };
            };
            text1.transition()
                .duration(waveRiseTime)
                .tween("text", textTween);
            text2.transition()
                .duration(waveRiseTime)
                .tween("text", textTween);
        }
    
        // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
        var waveGroupXPosition = fillCircleMargin+fillCircleRadius*2-waveClipWidth;
        if(waveRise){
            waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(0)+')')
                .transition()
                .duration(waveRiseTime)
                .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
                .on("start", function(){ wave.attr('transform','translate(1,0)'); }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
        } else {
            waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
        }
    
        if(waveAnimate) animateWave();
    
        function animateWave() {
            wave.attr('transform','translate('+waveAnimateScale(wave.attr('T'))+',0)');
            wave.transition()
                .duration(waveAnimateTime * (1-wave.attr('T')))
                .ease(d3.easeLinear)
                .attr('transform','translate('+waveAnimateScale(1)+',0)')
                .attr('T', 1)
                .on('end', function(){
                    wave.attr('T', 0);
                    animateWave(waveAnimateTime);
                });
        }
    
        function GaugeUpdater(){
            this.update = function(value){
                var newFinalValue = parseFloat(value).toFixed(2);
                var textRounderUpdater = function(value){ return Math.round(value); };
                if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                    textRounderUpdater = function(value){ return parseFloat(value).toFixed(1); };
                }
                if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
                    textRounderUpdater = function(value){ return parseFloat(value).toFixed(2); };
                }
    
                var textTween = function(){
                    var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
                    var myText = d3.select(this);
                    return function(t) {
                        myText.text(textRounder(i(t)) + percentText);
                    };
                };
    
                text1.transition()
                    .duration(waveRiseTime)
                    .tween("text", textTween);
                text2.transition()
                    .duration(waveRiseTime)
                    .tween("text", textTween);
    
                var fillPercent = Math.max(minValue, Math.min(maxValue, value))/maxValue;
                var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
                var waveRiseScale = d3.scaleLinear()
                    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                    // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                    // circle at 100%.
                    .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
                    .domain([0,1]);
                var newHeight = waveRiseScale(fillPercent);
                var waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
                var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);
                var newClipArea;
                if(waveHeightScaling){
                    newClipArea = d3.area()
                        .x(function(d) { return waveScaleX(d.x); } )
                        .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*waveOffset*-1 + Math.PI*2*(1-waveCount) + d.y*2*Math.PI));} )
                        .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
                } else {
                    newClipArea = clipArea;
                }
    
                var newWavePosition = waveAnimate?waveAnimateScale(1):0;
                wave.transition()
                    .duration(0)
                    .transition()
                    .duration(waveAnimate?(waveAnimateTime * (1-wave.attr('T'))):(waveRiseTime))
                    .ease(d3.easeLinear)
                    .attr('d', newClipArea)
                    .attr('transform','translate('+newWavePosition+',0)')
                    .attr('T','1')
                    .on("end", function(){
                        if(waveAnimate){
                            wave.attr('transform','translate('+waveAnimateScale(0)+',0)');
                            animateWave(waveAnimateTime);
                        }
                    });
                waveGroup.transition()
                    .duration(waveRiseTime)
                    .attr('transform','translate('+waveGroupXPosition+','+newHeight+')')
            };
        }
    
        return new GaugeUpdater();
    }

    render() {
        return (
            <div>
                <svg id="attendanceGauge" width="97%" height="250"></svg>
            </div>
        )
    }
}

export default Attendance;
