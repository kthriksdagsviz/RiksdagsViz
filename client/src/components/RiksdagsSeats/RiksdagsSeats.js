import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';
const stuff = ledamoter[85].id;

export default class RiksdagsSeats extends Component {

    constructor(props){
        super(props)
        this.state={
            selectedSeat: ledamoter[85].id 
        }
    }

  
    buildSVG = () => {
        
        return(
            <SvgLoader path="/RiksdagStolar.svg" style={{width:'100%', height:'50vh'}} >
                <SvgProxy selector={this.state.selectedSeat} fill={"green"}  />
            </SvgLoader>
        )
    }

    setSeat = (e) => {

        let RiksdagStolar = d3.select('.riksdags_map')
        //let paths = RiksdagStolar.selectAll().attr({"fill":"#fff"})
        RiksdagStolar.select("svg").select("#Welcome").selectAll("path").style("fill", "red")

        if(e.target.id != "") {
            this.props.selectLedamot()
            this.setState({
                selectedSeat: '#' + e.target.id
            })
        }
    }
    render() {
        return (
            <div className="riksdags_map" onClick= {(e) => this.setSeat(e)}>
                {this.buildSVG()}
            </div>
        )
    }
}