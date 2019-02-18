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
    // [V, S, MP, C, L, KD, M, SD]
    var partyListOut = [...Array(8)].map(e => Array(8).fill(0));

    for (var i = 0; i < partyList.length; i++) {
        for (var j = 0; j < partyList.length; j++) {
            for (var k = 0; k < partyList[i].length; k++) {
                let partyIn1 = partyList[i][k];
                let partyIn2 = partyList[j][k];               

                delete partyIn1.votering_id;
                delete partyIn1.Frånvarande;
                delete partyIn2.votering_id;
                delete partyIn2.Frånvarande;

                let party1 = Object.keys(partyIn1).reduce(function (a, b) { return partyIn1[a] > partyIn1[b] ? a : b });
                let party2 = Object.keys(partyIn2).reduce(function (a, b) { return partyIn2[a] > partyIn2[b] ? a : b });

                partyListOut[i][j] += createInteger(partyIn1[party2]);
                partyListOut[j][i] += createInteger(partyIn2[party1]);
            }
        }
    }

    for (let i = 0; i < partyListOut.length; i++) {
      let partiVotes = partyListOut[i].reduce((a, b) => a + b, 0)
      for (let j = 0; j < partyListOut.length; j++) {
        partyListOut[i][j] = partyListOut[i][j] / partiVotes;
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
      this.drawChart(voteByParty())
    }

    createInteger = (string) => {
      var parsed = parseInt(string, 10);
      if (isNaN(parsed)) { return 0 }
      return parsed;
  }

  


    drawChart(dataset) {
        const diameter = 550;

        var svg = d3.select("#compareChart")
          .append("svg")
            .attr("width", diameter + 50)
            .attr("height", diameter + 50)
          .append("g")
            .attr("class", "chord")
            .attr("transform", `translate(${diameter/2 + 25}, ${diameter/2 + 25})`);

        var parties = ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD'];
        var partiesLong = ['Vänsterpartiet', 'Socialdemokraterna', 'Miljöpartiet', 'Centerpartiet', 
                           'Liberalerna', 'Kristdemokraterna', 'Moderaterna', 'Sverigedemokraterna'];

        var colors = [partyColors.partyV, partyColors.partyS, partyColors.partyMP, partyColors.partyC,
                      partyColors.partyL, partyColors.partyKD, partyColors.partyM, partyColors.partySD];

        var partyVoters = dataset.map((x, i) => { return x[i]});

        dataset.map((x,i) => {
          return x[i] = 0;
        })

        var highlight = (group => {
          links
            .style("fill", d => { 
              if (d.source.index == group.index) { 
                return colors[d.target.index];
              }
              else if (d.target.index == group.index) { 
                return colors[d.source.index];
              }
              else {
                return colors[d.source.index];
              }
            })
            .style("opacity", d => { 
              if (d.source.index != group.index && d.target.index != group.index) { 
                return 0.075; 
              }
            })
            .sort(d => { 
              if (d.source.index != group.index && d.target.index != group.index) { 
                return -1;
                }
              else return 1; 
          });

          tooltip.selectAll("*").remove()
          tooltip.append('h1').text(partiesLong[group.index])

          for (let i = 0; i < partiesLong.length; i++) {
            if (i != group.index) {
              tooltip.append('p').text(() => { 
                return '...are in ' + (100 * dataset[group.index][i] / partyVoters[group.index]).toFixed(1) + '% of all cases voting the same as the political line of ' + parties[i]
              })
            }
          }
        })

        var unhighlight = (group => {
          links
            .style("fill", d => { 
                return colors[d.source.index];
            })
            .style('opacity', 1)
            .sort();
        })

        var res = d3.chord()
          .padAngle(0.05)
          .sortSubgroups(d3.descending)
          (dataset)

        var groups = svg.datum(res).append("g").selectAll("g")
          .data(d => { return d.groups; })
          .enter()
          .append("g")
          
        var circle = groups.append("path").attr("id", d => { return "group-" + d.index; })
          .style("fill", (d,i) => { return colors[i] })
          .on("mouseover", highlight)
          .on("mouseleave", unhighlight)
          .attr("d", d3.arc()
            .innerRadius(diameter/2 + 1)
            .outerRadius(diameter/2 + 21))
            
        var groupLabel = groups.append("text")
          .attr("x", "5")
          .attr("dy", "16")
            .append("textPath")
            .attr("xlink:href", d => { return "#group-" + d.index; })
            .text(d => {return parties[d.index]})
            .style("fill", "#fff")
            .on("mouseover", highlight)
            .on("mouseleave", unhighlight)

        var links = svg.datum(res).append("g").selectAll("path")
          .data(d => { return d; })
          .enter()
          .append("path")
            .attr("d", d3.ribbon()
              .radius(diameter/2)
            )
            .style("fill", d => { return(colors[d.source.index]) })
            .style("stroke", "#fff");

        var tooltip = d3.select("#compareTooltip");
    }


    render() {
      
        return (
            <div id="compareContainer" style={{display: 'flex', justifyContent: 'center'}}>
                <div id="compareChart" />
                <div id="compareTooltip" style={{margin: '100px 0px 0px 100px'}}/>
            </div>
        )
    }
}