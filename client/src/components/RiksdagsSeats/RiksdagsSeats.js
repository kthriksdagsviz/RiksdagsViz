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
        
        return(<SvgLoader path="/RiksdagStolar.svg">
            <SvgProxy selector={this.state.selectedSeat} fill={"green"} />
        </SvgLoader>)
    }

    setSeat = (e) => {

        console.log(this.state.selectedSeat)
        let RiksdagStolar = d3.select('.riksdags_map')
        //let paths = RiksdagStolar.selectAll().attr({"fill":"#fff"})
        RiksdagStolar.select("svg").select("#Welcome").selectAll("path").style("fill", "red")

        if(e.target.id != "") {
            this.setState({
                selectedSeat:"#"
            })
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