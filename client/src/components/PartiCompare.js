import React, { Component } from 'react'
import * as d3 from 'd3'
import partyList from './PartiCompareRawData'
import partyColors from '../styles/colors.scss'


import { votes1718, votes1617, votes1516, votes1415, votes1314, votes1213, votes1112, votes1011, votes0910, votes0809, votes0708, votes0607, votes0506, votes0405, votes0304, votes0203 } from './oldVoteData/oldVoteExport'

const previousVoteData = [partyList, votes1718, votes1617, votes1516, votes1415, votes1314, votes1213, votes1112, votes1011, votes0910, votes0809, votes0708, votes0607, votes0506, votes0405, votes0304, votes0203];
const previousVotingYears = ["now", "1718", "1617", "1516", "1415", "1314", "1213", "1112", "1011", "0910", "0809", "0708", "0607", "0506", "0405", "0304", "0203"];

const createInteger = (string) => {
    var parsed = parseInt(string, 10);
    if (isNaN(parsed)) { return 0 }
    return parsed;
}

const voteByParty = (partyListIn) => {
    // [V, S, MP, C, L, KD, M, SD]
    var partyListOut = [...Array(partyListIn.length)].map(e => Array(partyListIn.length).fill(0));

    for (var i = 0; i < partyListIn.length; i++) {
        for (var j = 0; j < partyListIn.length; j++) {
            for (var k = 0; k < partyListIn[i].length; k++) {
                let partyIn1 = partyListIn[i][k];
                let partyIn2 = partyListIn[j][k];               
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
        votesByYear: "",
        readyToUpdate: true
      }

      this.previousVoteData = [partyList, votes1718, votes1617, votes1516, votes1415, votes1314, votes1213, votes1112, votes1011, votes0910, votes0809, votes0708, votes0607, votes0506, votes0405, votes0304, votes0203];
      this.previousVotingYears = ["now", "1718", "1617", "1516", "1415", "1314", "1213", "1112", "1011", "0910", "0809", "0708", "0607", "0506", "0405", "0304", "0203"];

    }

    chooseVoteYear = (e, years) => {
      let year = e ? e.target.value : years
      var newYear = partyList;
      for (let i = 0; i < previousVotingYears.length; i++) {
          if (years === previousVotingYears[i]) {
              newYear = previousVoteData[i];
          }
      }
      this.setState({
        votesByYear: newYear
      }, () => {
        this.props.onYearChange(year)
        d3.select("#compareChart").selectAll("*").remove()

        this.drawChart(voteByParty(this.state.votesByYear))
      })
    }
    

    componentDidMount() {
      const { data } = this.props;
      this.chooseVoteYear(null, '0506')
     
    }

    componentDidUpdate(nextProps) {
      //this.drawChart(voteByParty(this.state.votesByYear))
      if(nextProps.selectedYear != this.props.selectedYear){
        let yearString ="";
        switch(nextProps.selectedYear){
          case 2002:
            yearString = '0203'
            break
          case 2003:
            yearString = '0304'
            break
          case 2004:
            yearString = '0405'
            break 
          case 2005:
            yearString = '0506'
            break
          case 2006:
            yearString = '0607'
            break 
          case 2007:
            yearString = '0708'
            break
          case 2008:
            yearString = '0809'
            break 
          case 2009:
            yearString = '0910'
            break
          case 2010:
            yearString = '1011'
            break 
          case 2011:
            yearString = '1112'
            break 
          case 2012:
            yearString = '1213'
            break
          case 2013:
            yearString = '1314'
            break
          case 2014:
            yearString = '1415'
            break 
          case 2015:
            yearString = '1516'
            break
          case 2016:
            yearString = '1617'
            break 
          case 2017:
            yearString = '1718'
            break
          default:
            yearString ='0203' 
        }
        this.chooseVoteYear(null, yearString)
        
      }
      

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
                <div id="changeYearButtons" style={{display: 'flex', flexFlow: 'column wrap'}}>
                  <button id="now" value="now" onClick={this.chooseVoteYear}>Now</button>
                  <button id="1718" value="1718" onClick={this.chooseVoteYear}>17/18</button>
                  <button id="1617" value="1617" onClick={this.chooseVoteYear}>16/17</button>
                  <button id="1516" value="1516" onClick={this.chooseVoteYear}>15/16</button>
                  <button id="1415" value="1415" onClick={this.chooseVoteYear}>14/15</button>
                  <button id="1314" value="1314" onClick={this.chooseVoteYear}>13/14</button>
                  <button id="1213" value="1213" onClick={this.chooseVoteYear}>12/13</button>
                  <button id="1112" value="1112" onClick={this.chooseVoteYear}>11/12</button>
                  <button id="1011" value="1011" onClick={this.chooseVoteYear}>10/11</button>
                  <button id="0910" value="0910" onClick={this.chooseVoteYear}>09/10</button>
                  <button id="0809" value="0809" onClick={this.chooseVoteYear}>08/09</button>
                  <button id="0708" value="0708" onClick={this.chooseVoteYear}>07/08</button>
                  <button id="0607" value="0607" onClick={this.chooseVoteYear}>06/07</button>
                  <button id="0506" value="0506" onClick={this.chooseVoteYear}>05/06</button>
                  <button id="0405" value="0405" onClick={this.chooseVoteYear}>04/05</button>
                  <button id="0304" value="0304" onClick={this.chooseVoteYear}>03/04</button>
                  <button id="0203" value="0203" onClick={this.chooseVoteYear}>02/03</button>
                </div>
                <div id="compareTooltip" style={{margin: '100px 0px 0px 100px'}}/>
            </div>
        )
    }
}