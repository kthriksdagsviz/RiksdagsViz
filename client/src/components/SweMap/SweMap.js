import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';
import _ from 'lodash'
//import './SweMap.scss'
 
export default class SweMap extends Component {

    buildSVG = () => {
        var map = <SvgLoader path="/SweMap.svg" width="100%" height="100%" viewBox="-5 -5 600 600" preserveAspectRatio="none">
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
        setTimeout(() => {
            let sweMap = d3.select('.swe_map')
            for (var i = 0; i < Object.keys(id).length; i++) {
                var opacity = id[Object.keys(id)[i]]/5;
                var newID = "#" + Object.keys(id)[i];
                sweMap.select(newID).style("fill", this.hex2rgba(this.props.color, opacity));
                sweMap.select(newID).selectAll('path').style("fill", this.hex2rgba(this.props.color, opacity));
                sweMap.select(newID).selectAll('polygon').style("fill", this.hex2rgba(this.props.color, opacity));

                //sweMap.select(newID).attr("class", "info");
                //sweMap.select(newID).text("Antal ledamöter: " + id[Object.keys(id)[i]]);
                //sweMap.select(newID).selectAll('polygon').text("Antal ledamöter: " + id[Object.keys(id)[i]]);
                //sweMap.select(newID).innerHTML += "<span class='infotext'>Antal ledamöter: "+ id[Object.keys(id)[i]] +"</span>";
                //sweMap.select(newID).selectAll('path').innerHTML += "<span class='infotext'>Antal ledamöter: "+ id[Object.keys(id)[i]] +"</span>";
                //sweMap.select(newID).selectAll('polygon').innerHTML += "<span class='infotext'>Antal ledamöter: "+ id[Object.keys(id)[i]] +"</span>";
            }
            
          }, 300);
    }

    hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
      };

    render() {
    
        return (
             <div className="swe_map" width="400px" height="700px">
                {this.buildSVG()}
                {this.modifySVG()}
                {this.selectCounty(this.props.valkrets)}
            </div>
        )
    }
}