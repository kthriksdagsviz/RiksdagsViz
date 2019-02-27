import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';
import _ from 'lodash'
import './SweMap.scss'

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
            sweMap.selectAll("path").style("fill", "white");
            sweMap.selectAll("polygon").style("fill", "white");
          }, 300);
    }

    selectCounty = (id) => {
        console.log(id[Object.keys(id)[0]]);
        console.log(Object.keys(id).length);
        var num = 1 / id.length;
        setTimeout(() => {
            let sweMap = d3.select('.swe_map')
            for (var i = 0; i < Object.keys(id).length; i++) {
                var opacity = 1/(i+1);
                var newID = "#" + Object.keys(id)[i];
                sweMap.select(newID).style("fill", "rgb(90, 150, 255,"+opacity+")");
                sweMap.select(newID).selectAll('path').style("fill", "rgb(90, 150, 255,"+opacity+")");
                sweMap.select(newID).selectAll('polygon').style("fill", "rgb(90, 150, 255,"+opacity+")");

                sweMap.select(newID).attr("class", "info");
                sweMap.select(newID).selectAll('path').innerHTML += "<span class='infotext'>Antal ledamöter: "+ id[Object.keys(id)[i]] +"</span>";
                sweMap.select(newID).selectAll('polygon').innerHTML += "<span class='infotext'>Antal ledamöter: "+ id[Object.keys(id)[i]] +"</span>";
            }
            
          }, 300);
    }

    destroyMap = () => {
        d3.select('.swe_map').remove();
    }

    

    render() {
    
        return (
             <div className="swe_map" width="400px" height="700px">
                {this.buildSVG()}
                {this.modifySVG()}
                {this.selectCounty({"W":5, "AB":2, "H":3, "G":1})}
            </div>
        )
    }
}