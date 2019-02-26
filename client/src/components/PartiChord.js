import { ResponsiveChord } from '@nivo/chord'
import React from 'react'
import { votes1718, votes1617, votes1516, votes1415, votes1314, votes1213, votes1112, votes1011, votes0910, votes0809, votes0708, votes0607, votes0506, votes0405, votes0304, votes0203 } from './oldVoteData/oldVoteExport'
import partyList from './PartiCompareRawData'
import partyColors from '../styles/colors.scss'
import * as d3 from 'd3'


export default class PartiChord extends React.Component{
    constructor(props){
        super(props)
        this.state={
            chordData:[],
            hoverParty: '',
            partyData:[], 
            hoverData: []
        }
        this.previousVoteData = [partyList, votes1718, votes1617, votes1516, votes1415, votes1314, votes1213, votes1112, votes1011, votes0910, votes0809, votes0708, votes0607, votes0506, votes0405, votes0304, votes0203];
        this.previousVotingYears = ["now", "1718", "1617", "1516", "1415", "1314", "1213", "1112", "1011", "0910", "0809", "0708", "0607", "0506", "0405", "0304", "0203"];
        this.parties = ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD'];
        this.colors = [partyColors.partyV, partyColors.partyS, partyColors.partyMP, partyColors.partyC,
            partyColors.partyL, partyColors.partyKD, partyColors.partyM, partyColors.partySD];
        this.myRef = React.createRef();
        this.partiesLong = ['Vänsterpartiet', 'Socialdemokraterna', 'Miljöpartiet', 'Centerpartiet', 
        'Liberalerna', 'Kristdemokraterna', 'Moderaterna', 'Sverigedemokraterna'];
    }

    createInteger = (string) => {
        var parsed = parseInt(string, 10);
        if (isNaN(parsed)) { return 0 }
        return parsed;
    }

    voteByParty = (partyListIn) => {
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
    
                    partyListOut[i][j] += this.createInteger(partyIn1[party2]);
                    partyListOut[j][i] += this.createInteger(partyIn2[party1]);
              }
            }
        }
    
        for (let i = 0; i < partyListOut.length; i++) {
            let partiVotes = partyListOut[i].reduce((a, b) => a + b, 0)
            for (let j = 0; j < partyListOut.length; j++) {
              partyListOut[i][j] = partyListOut[i][j] / partiVotes;
            }
        }
        let newArray = partyListOut.map(a => ([...a]));

        partyListOut.map((x,i) => {
            x[i] = 0
        })
        console.log(newArray)
        this.setState({chordData: partyListOut, partyData: newArray} )
    }
 
    getColor = (e) => {
        return this.colors
    }

    chooseVoteYear = (year) => {
        let y =  year
        var newYear = partyList;
        for (let i = 0; i < this.previousVotingYears.length; i++) {
            if (y === this.previousVotingYears[i]) {
                newYear = this.previousVoteData[i];
            }
        }
        this.voteByParty(newYear)
        this.props.onYearChange(year);
      }

    componentDidMount(){
        this.voteByParty(this.previousVoteData[0])
        setTimeout(() => this.selectSvg(), 100)
        
    }

    selectSvg = () =>{
        let svg = d3.selectAll('#respCord')
        let div = svg.selectAll('div')
        let secDiv = div.select('div')
        let svgg = secDiv.select('svg')
        // var groups = svg.selectAll("path")
        // groups
        //     .on("click", function(group, i){
        //         console.log(group, i)
        // })

        // var partyVoters = this.state.partyData.map((x, i) => { return x[i]} );
        let hoverData = []

        // console.log(this.state.partyData[1][1])

        let self = this;
        let group = svgg.select('g').select('g').select('g:nth-child(2)').selectAll('path')
        .on('mouseover', function(d, i){
            let partyVoters = self.state.partyData.map((x, i) => { return x[i]} );
            for (let j = 0; j < self.state.partyData.length; j++) {
                // if(i != j){
                    hoverData.push((100 * self.state.partyData[j][i] / partyVoters[i]).toFixed(3)  + '% av fallen: röstar enligt samma politiska linje som ' + self.parties[j]) 
                // }
              //  console.log(self.state.chordData[i][j], partyVoters)
                
            }
              
            self.setState({hoverParty: self.partiesLong[i], hoverData: hoverData})

        }).on('mouseleave', function(d, i){
            hoverData = [];
        })
        
        // console.log(group)

    }
    
  
    changeToolTip = (y) => {
        return y + " %"
    }
    componentDidUpdate(nextProps) {
        if(nextProps.selectedYear != this.props.selectedYear){
          let yearString ="";
          switch(nextProps.selectedYear){
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
          }
          this.chooseVoteYear(yearString)
        }
    }
    renderToolTip = () => {
        return (
            <div>
                {this.state.hoverData.map((row, i)=> (
                   <p key={i}> {row} </p> 
                ))}
            </div>
        )
    }

    
    render(){
        return(
            <div style={{height: '600px', width:'100%', display:'flex', alignItems:'center'}}>
            <div id="respCord" style={{height: '600px', width:'50%'}}>
                <ResponsiveChord
                    matrix={this.state.chordData}
                    keys={this.parties}
                    margin={{
                        "top": 60,
                        "right": 60,
                        "bottom": 90,
                        "left": 60
                    }}
                       
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}
                        padAngle={0.02}
                        innerRadiusRatio={0.96}
                        innerRadiusOffset={0.02}
                        arcOpacity={1}
                        arcBorderWidth={1}
                        arcBorderColor="inherit:darker(0.4)"
                        ribbonOpacity={0.5}
                        ribbonBorderWidth={1}
                        ribbonBorderColor="inherit:darker(0.4)"
                        enableLabel={true}
                        label="id"
                        labelOffset={12}
                        labelRotation={-90}
                        labelTextColor="inherit:darker(1)"
                        colors={this.getColor()}
                        isInteractive={true}
                        arcHoverOpacity={1}
                        arcHoverOthersOpacity={0.25}
                        ribbonHoverOpacity={0.75}
                        ribbonHoverOthersOpacity={0.25}
                        animate={true}
                        motionStiffness={90}
                        tooltipFormat={this.changeToolTip}
                        motionDamping={17}
                        legends={[
                            {
                                "anchor": "bottom",
                                "direction": "row",
                                "translateY": 70,
                                "itemWidth": 80,
                                "itemHeight": 14,
                                "itemTextColor": "#999",
                                "symbolSize": 12,
                                "symbolShape": "circle",
                                "effects": [
                                    {
                                        "on": "hover",
                                        "style": {
                                            "itemTextColor": "#000"
                                        }
                                    }
                                ]
                            }
                        ]}
                />
                
            </div>
            {this.state.hoverParty.length > 0 && (<div>
                {this.state.hoverParty}
                {this.state.hoverData.length > 0 && this.renderToolTip()}
                </div>)}
            </div>
        )
    }
}