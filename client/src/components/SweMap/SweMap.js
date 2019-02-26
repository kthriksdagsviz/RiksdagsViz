import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';
import _ from 'lodash'

export default class SweMap extends Component {

    constructor(props){
        super(props)
        this.state={
            selectedCounty: "",
            build: false,
            rebuild: false,
            selectedName: "",
            fetchedPerson:{},
            filteredSelection:[]
        }
    }

    buildSVG = () => {
        var map = <SvgLoader path="/SweMap.svg" width="100%" height="100%" viewBox="0 0 1000 1000">
        </SvgLoader>
        return(
            map
        )
    }

    modifySVG = () => {
        setTimeout(() => {
            let sweMap = d3.select('.swe_map')
            sweMap.selectAll("path").style("fill", "#e9f0fc");
            sweMap.selectAll("polygon").style("fill", "#e9f0fc");
          }, 300);
    }

    selectCounty = (id) => {
        console.log(id.length);
        var num = 1 / id.length;
        setTimeout(() => {
            let sweMap = d3.select('.swe_map')
            for (var i = 0; i < id.length; i++) {
                var opacity = 1/(i+1);
                console.log(opacity);
                sweMap.select("#"+id[i]).style("fill", "rgb(137, 176, 242,"+opacity+")");
            }
            
          }, 300);
    }

    destroyMap = () => {
        d3.select('.swe_map').remove();
    }

    

    render() {
    
        return (
            // <div className="swe_map" onClick= {(e) => this.setSeat(e)}>
             <div className="swe_map" width="400px" height="700px">
                {this.buildSVG()}
                {this.modifySVG()}
                {this.selectCounty(["W", "AB", "H"])}
            </div>
        )
    }
}