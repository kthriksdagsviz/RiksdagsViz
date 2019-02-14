import React, { Component } from 'react'
import * as d3 from 'd3'
import partyList from './PartiCompareRawData'
import partyColors from '../styles/colors.scss'

const createInteger = (string) => {
    var parsed = parseInt(string, 10);
    if (isNaN(parsed)) { return 0 }
    return parsed;
}

const voteByParty = () => {
    // [V, S, MP, C, L, KD, M SD]
    var partyListOut = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    /* let partyNameList = ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD']; */
    for (var i = 0; i < partyList.length; i++) {
        for (var j = i + 1; j < partyList.length; j++) {
            for (var k = 0; k < partyList[i].length; k++) {
                let partyIn1 = partyList[i][k];
                delete partyIn1.votering_id;
                delete partyIn1.Frånvarande;
                let partyIn2 = partyList[j][k];
                delete partyIn2.votering_id;
                delete partyIn2.Frånvarande;
                let party1 = Object.keys(partyIn1).reduce(function (a, b) { return partyIn1[a] > partyIn1[b] ? a : b });
                let party2 = Object.keys(partyIn2).reduce(function (a, b) { return partyIn2[a] > partyIn2[b] ? a : b });
                partyListOut[i][j] += createInteger(partyIn1[party2]);
                partyListOut[j][i] += createInteger(partyIn2[party1]);
            }
        }
    }
    return partyListOut;
}

export default class PartiCompare extends Component {
    constructor(props) {
      super(props);
      this.drawChart = this.drawChart.bind(this)
  
      this.state = {
      
      }
    }
    

    componentDidMount() {
      const { data } = this.props;
      this.drawChart(data)
    }


    drawChart(dataset) {
        const diameter = 400;

        var svg = d3.select("#compareChart")
          .append("svg")
            .attr("width", diameter + 50)
            .attr("height", diameter + 50)
          .append("g")
            .attr("class", "chord")
            .attr("transform", `translate(${diameter/2 + 25}, ${diameter/2 + 25})`);

        
        // [V, S, MP, C, L, KD, M, SD]
        var partySize = [28, 100, 16, 31, 20, 22, 70, 62];

        /* var data = [
            // [V, S, MP, C, L, KD, M, SD]
            [0,  80000, 4916, 2868, 2000, 250, 11, 1275],
            [8000,  0, 8916, 2868, 2000, 2500, 1341, 75],
            [4916,  8196, 0, 2868, 2000, 250, 11, 1275],
            [2868,  2868, 2868, 0, 2000, 2500, 11, 75],
            [2000,  2000, 2000, 2000, 0, 250, 1231, 75],
            [250,  2500, 250, 2500, 250, 0, 11, 2275],
            [11,  1341, 11, 11, 1231, 11, 0, 2275],
            [1275,  75, 1275, 75, 75, 2275, 2275, 0]
          ]; */

        var data = voteByParty();

        var parties = ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD'];

        var colors = [partyColors.partyV, partyColors.partyS, partyColors.partyMP, partyColors.partyC,
                      partyColors.partyL, partyColors.partyKD, partyColors.partyM, partyColors.partySD];

        var highlight = (group => {
          links
            .style("opacity", d => { 
              if (d.source.index != group.index && d.target.index != group.index) { 
                return 0.1; 
              }
            })
            .sort(d => { 
              if (d.source.index != group.index && d.target.index != group.index) { 
                return -1;
                }
              else return 1; 
          });
        })

        var unhighlight = (group => {
          links
            .style('opacity', 1)
            .sort();
        })

        var res = d3.chord()
          .padAngle(0.05)     // padding between entities (black arc)
          .sortSubgroups(d3.descending)
          (data)

        var groups = svg.datum(res).append("g").selectAll("g")
          .data(d => { return d.groups; })
          .enter()
          .append("g")
          
        var circle = groups.append("path").attr("id", d => { return "group-" + d.index; })
          .style("fill", (d,i) => { return colors[i] })
          .style("stroke", "black")
          .on("mouseover", highlight)
          .on("mouseleave", unhighlight)
          .attr("d", d3.arc()
            .innerRadius(diameter/2)
            .outerRadius(diameter/2 + 20))

        var groupLabel = groups.append("text").attr("x", "5").attr("dy", "16")
          .append("textPath")
          .attr("xlink:href", d => { return "#group-" + d.index; })
          .text(d => {return parties[d.index]})

        var links = svg.datum(res).append("g").selectAll("path")
          .data(d => { return d; })
          .enter()
          .append("path")
            .attr("d", d3.ribbon()
              .radius(diameter/2)
            )
            .style("fill", d => { return(colors[d.source.index]) })
            .style("stroke", "black");
    }


    render() {
        return (
            <div id="compareContainer">
                <div id="compareChart"/>
            </div>
        )
    }
}