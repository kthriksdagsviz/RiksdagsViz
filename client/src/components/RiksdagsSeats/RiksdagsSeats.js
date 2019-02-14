import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';

export default class RiksdagsSeats extends Component {

    constructor(props){
        super(props)
        this.state={
            selectedSeats: ledamoter[85].id
        }
    }

  
    buildSVG = () => {
        
        return(
            <SvgLoader path="/RiksdagStolar.svg" style={{width:'100%', height:'50vh'}} >
                <SvgProxy selector={this.state.selectedSeats} fill={"green"}  />
            </SvgLoader>
        )
    }

    setSeat = (e) => {
        if(e.target.id !== "") {
            this.props.selectLedamot()
            this.setState({
                selectedSeats: '#' + e.target.id
            })
        }
    }

    setTransition = (e) => {
        this.setSeat(e)
        let RiksdagStolar = d3.select('.riksdags_map')
        var ypaddingfactor = 0.1;
        var mstolar = 0;
        var sstolar = 0;
        var lstolar = 0;
        var vstolar = 0;
        var mpstolar = 0;
        var kdstolar = 0;
        var sdstolar = 0;
        var cstolar = 0;

        RiksdagStolar.select("svg").select("#Welcome").selectAll("path").transition().attr("d", "M508,182 L494,182 C494,182 494,168.612852 494,168.612852 C495.14429,166.980014 497.071117,165 501,165 C504.944852,165 506.85571,166.980014 508,168.612852 C508,168.612852 508,182 508,182 Z", "fill").duration(900)
        setTimeout(() => {
            for (var i=0; i < ledamoter.length; i++ ){
                let path = RiksdagStolar.select("svg").select("#Welcome").select(ledamoter[i].id)
                if(ledamoter[i].party === "M") {
                    path.attr("fill", "#0ebdef")
                    if(mstolar <= 20) {
                        var xpos = -path.node().getBBox().x+0;
                        var ypos = -path.node().getBBox().y*((-ypaddingfactor*mstolar)+1);
                    }
                    else if ((mstolar > 20 && mstolar <= 40)){
                        xpos = -path.node().getBBox().x+25;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(mstolar-21))+1);
                    }
                    else if ((mstolar > 40 && mstolar <= 60)){
                        xpos = -path.node().getBBox().x+50;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(mstolar-41))+1);
                    }
                    else if ((mstolar > 60 && mstolar <= 80)){
                        xpos = -path.node().getBBox().x+75;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(mstolar-61))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    mstolar+=1;
                }
                else if(ledamoter[i].party === "S"){
                    path.attr("fill", "#ff0000")
                    if(sstolar <= 20) {
                        xpos = -path.node().getBBox().x+125;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*sstolar)+1);
                    }
                    else if ((sstolar > 20 && sstolar <= 40)){
                        xpos = -path.node().getBBox().x+150;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-21))+1);
                    }
                    else if ((sstolar > 40 && sstolar <= 60)){
                        xpos = -path.node().getBBox().x+175;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-41))+1);
                    }
                    else if ((sstolar > 60 && sstolar <= 80)){
                        xpos = -path.node().getBBox().x+200;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-61))+1);
                    }
                    else if ((sstolar > 80 && sstolar <= 105)){
                        xpos = -path.node().getBBox().x+225;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-81))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    sstolar+=1;
                }
                else if(ledamoter[i].party === "L"){
                    path.transition().attr("fill", "#0065b6").duration(1000)
                    xpos = -path.node().getBBox().x+250;
                    ypos = -path.node().getBBox().y*((-ypaddingfactor*lstolar)+1);
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    lstolar+=1;
                }
                else if(ledamoter[i].party === "V"){
                    path.transition().attr("fill", "#ef0000").duration(1000)
                    if(vstolar <= 20) {
                        xpos = -path.node().getBBox().x+375;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*vstolar)+1);
                    }
                    else if ((vstolar > 20 && vstolar <= 40)){
                        xpos = -path.node().getBBox().x+400;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(vstolar-21))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    vstolar+=1;
                }
                else if(ledamoter[i].party === "MP"){
                    path.transition().attr("fill", "#12a846").duration(1000)
                    xpos = -path.node().getBBox().x+500;
                    ypos = -path.node().getBBox().y*((-ypaddingfactor*mpstolar)+1);
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    mpstolar+=1;
                }
                else if(ledamoter[i].party === "KD"){
                    path.transition().attr("fill", "#0059a3").duration(1000)
                    xpos = -path.node().getBBox().x+625;
                    ypos = -path.node().getBBox().y*((-ypaddingfactor*kdstolar)+1);
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    kdstolar+=1;
                }
                else if(ledamoter[i].party === "SD"){
                    path.transition().attr("fill", "#ffca00").duration(1000)
                    if(sdstolar <= 20) {
                        var xpos = -path.node().getBBox().x+750;
                        var ypos = -path.node().getBBox().y*((-ypaddingfactor*sdstolar)+1);
                    }
                    else if ((sdstolar > 20 && sdstolar <= 40)){
                        xpos = -path.node().getBBox().x+775;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sdstolar-21))+1);
                    }
                    else if ((sdstolar > 40 && sdstolar <= 65)){
                        xpos = -path.node().getBBox().x+800;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sdstolar-41))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    sdstolar+=1;
                }
                else if(ledamoter[i].party === "C"){
                    path.attr("fill", "#00703c")
                    if(cstolar <= 20) {
                        xpos = -path.node().getBBox().x+925;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*cstolar)+1);
                    }
                    else if ((cstolar > 20 && cstolar <= 40)){
                        xpos = -path.node().getBBox().x+950;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(cstolar-21))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    cstolar+=1;
                }
            }
          }, 1200);
    }
    render() {
        return (
            // <div className="riksdags_map" onClick= {(e) => this.setSeat(e)}>
             <div className="riksdags_map" onClick={(e) => this.setTransition(e)}>
                {this.buildSVG()}
            </div>
        )
    }
}