import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';

export default class RiksdagsSeats extends Component {

    constructor(props){
        super(props)
        this.state={
            selectedSeat: ledamoter[85].id,
            idArr: ["s004", "s005", "s006", "s007", "s008"]
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
        // let RiksdagStolar = d3.select('.riksdags_map')
        // let path = RiksdagStolar.select("svg").select("#Welcome").select("#"+e.target.id)
        // var xpos = -path.node().getBBox().x;
        // var ypos = -path.node().getBBox().y*((-0.1*this.state.numSeats)+1);
        // console.log(this.state.numSeats)
        // path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
        if(e.target.id !== "") {
            this.props.selectLedamot()
            this.setState({
                selectedSeat: '#' + e.target.id
            })
        }
    }

    setTransition = (e) => {
        this.setSeat(e)
        let {idArr} = this.state;
        let RiksdagStolar = d3.select('.riksdags_map')
        var ypaddingfactor = 0.2;
        var mstolar = 0;
        var sstolar = 0;
        var lstolar = 0;
        var vstolar = 0;
        var mpstolar = 0;
        var kdstolar = 0;
        var sdstolar = 0;
        var cstolar = 0;

        for (var i=0; i < ledamoter.length; i++ ){
            let path = RiksdagStolar.select("svg").select("#Welcome").select(ledamoter[i].id)
            console.log(ledamoter[i].id, path)
            if(ledamoter[i].party === "M") {
                var xpos = -path.node().getBBox().x+125;
                var ypos = -path.node().getBBox().y*((-ypaddingfactor*mstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                mstolar+=1;
            }
            else if(ledamoter[i].party === "S"){
                xpos = -path.node().getBBox().x+250;
                ypos = -path.node().getBBox().y*((-ypaddingfactor*sstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                sstolar+=1;
            }
            else if(ledamoter[i].party === "L"){
                xpos = -path.node().getBBox().x+375;
                ypos = -path.node().getBBox().y*((-ypaddingfactor*lstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                lstolar+=1;
            }
            else if(ledamoter[i].party === "V"){
                xpos = -path.node().getBBox().x+500;
                ypos = -path.node().getBBox().y*((-ypaddingfactor*vstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                vstolar+=1;
            }
            else if(ledamoter[i].party === "MP"){
                xpos = -path.node().getBBox().x+625;
                ypos = -path.node().getBBox().y*((-ypaddingfactor*mpstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                mpstolar+=1;
            }
            else if(ledamoter[i].party === "KD"){
                xpos = -path.node().getBBox().x+750;
                ypos = -path.node().getBBox().y*((-ypaddingfactor*kdstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                kdstolar+=1;
            }
            else if(ledamoter[i].party === "SD"){
                xpos = -path.node().getBBox().x+875;
                ypos = -path.node().getBBox().y*((-ypaddingfactor*sdstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                sdstolar+=1;
            }
            else if(ledamoter[i].party === "C"){
                xpos = -path.node().getBBox().x+1000;
                ypos = -path.node().getBBox().y*((-ypaddingfactor*cstolar)+1);
                path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                cstolar+=1;
            }
        }
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