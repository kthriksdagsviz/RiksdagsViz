import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';
import {ledamoter_api} from '../../services'
import _ from 'lodash'
import {zoom } from 'd3-zoom'

export default class RiksdagsSeats extends Component {

    constructor(props){
        super(props)
        this.state={
            selectedSeat: "",
            build: false,
            rebuild: false,
            selectedName: "",
            fetchedPerson:{},
            filteredSelection:[],
            zoom:0.9
            // filteredSelection: [{"party": "M", "name": "John Widegren", "id": "#s031"}, {"party": "S", "name": "Johan Andersson", "id": "#s032"}, {"party": "S", "name": "Bj\u00f6rn Petersson", "id": "#s033"}, {"party": "SD", "name": "Mattias B\u00e4ckstr\u00f6m Johansson", "id": "#s034"}, {"party": "S", "name": "Laila Naraghi", "id": "#s035"}, {"party": "M", "name": "Annicka Engblom", "id": "#s036"}, {"party": "SD", "name": "Richard Jomshof", "id": "#s037"}, {"party": "M", "name": "Boriana \u00c5berg", "id": "#s038"}, {"party": "C", "name": "Ola Johansson", "id": "#s039"}, {"party": "S", "name": "Adnan Dibrani", "id": "#s040"}, {"party": "L", "name": "Bengt Eliasson", "id": "#s041"}]
        }
        this.zoom = zoom()
            .scaleExtent([1, 3])
            .on('zoom', this.zoomed.bind())
        
    }
    zoomed = () =>{
        
        d3.select('#Welcome').attr("transform", d3.event.transform);
    }

    resetZoom = () =>{
        d3.select('#Welcome').attr("transform",null);
    }

  
    buildSVG = () => {
        var map = <SvgLoader path="/RiksdagStolar.svg" style={{width:'100%', height:'60vh'}} >
        
        {/* <SvgProxy selector={this.state.selectedSeats} fill={"green"}  /> */}
        </SvgLoader>
        
        return(
            map
        )
    }


    modifySVG = (selection) => {
        var filter = d3.select('.riksdags_map').select("svg").append("defs").append("filter").attr("id", "glow");
        var gauss = filter.append('feGaussianBlur').attr("stdDeviation", 2.5).attr("result","coloredBlur")
        var merge = filter.append('feMerge')
        merge.append('feMergeNode').attr("in", "coloredBlur")
        merge.append('feMergeNode').attr("in", "SourceGraphic")
        setTimeout(() => {
            let RiksdagStolar = d3.select('.riksdags_map')
            RiksdagStolar.select("#Welcome").selectAll(".colored").attr("fill", "gray").classed("colored", false)
            for(var i = 0; i < selection.length; i++){
                RiksdagStolar.select("svg").select("#Welcome").select(selection[i].id).attr("fill", selection[i].color).classed("colored", true);
            }
          }, 300);
    }

    setSeat = (e) => {
        let RiksdagStolar = d3.select('.riksdags_map')
        if(e.target.id !== "") {
            let filteredledamot = ledamoter.filter(ledamot => {
                return ledamot.id === "#"+e.target.id
              })
            RiksdagStolar.select("svg").select("#Welcome").selectAll(".glow").style("filter", null).attr("fill", "gray").attr("class", null)
            RiksdagStolar.select("svg").select("#Welcome").select("#"+e.target.id).attr("fill", filteredledamot[0].color).attr("class", "glow").attr("fill-opacity", 1).style("filter", "url(#glow)")
            RiksdagStolar.select("svg").select("#Welcome").selectAll("path:not(.glow)").attr("fill-opacity", 0.4)
            let result = ledamoter.filter(ledamot => {
                return ledamot.id === "#"+e.target.id
              })
              let fname = result[0].name.split(" ")[0];
              let ename = result[0].name.split(" ")[1];
              let person ={
                tilltalsnamn: result[0].name.split()[0],
                efternamn: result[0].name.split()[1],
                parti: result[0].party,
                bild_url_80: "http://data.riksdagen.se/filarkiv/bilder/ledamot/9f5c5d35-c450-4068-923a-2d8d077223d5_80.jpg"
            }
            
            
            this.setState({
                selectedSeat: '#' + e.target.id,
                selectedName: result[0].name
            }, () => this.props.selectLedamot(fname, ename))
        }
    }


    setNewGroup = (parti) => {
        if(parti){
            let partiList = ledamoter.map(a => ({...a}));
            partiList = partiList.filter(a =>  a.party === parti)
            this.setState({filteredSelection: partiList})

        }
        else{
            let ledlist = [{"party": "M", "name": "Tomas Tob\u00e9", "id": "#s053"}, {"party": "V", "name": "Amineh Kakabaveh", "id": "#s054"}, {"party": "S", "name": "Ingela Nylund Watz", "id": "#s055"}, {"party": "S", "name": "Pyry Niemi", "id": "#s056"}, {"party": "M", "name": "Jessika Roswall", "id": "#s057"}, {"party": "SD", "name": "Markus Wiechel", "id": "#s058"}, {"party": "KD", "name": "Magnus Oscarsson", "id": "#s059"}, {"party": "SD", "name": "Anne Oskarsson", "id": "#s060"}, {"party": "S", "name": "Tomas Kronst\u00e5hl", "id": "#s061"}, {"party": "S", "name": "Magnus Manhammar", "id": "#s062"}, {"party": "SD", "name": "Angelika Bengtsson", "id": "#s063"}, {"party": "S", "name": "Rikard Larsson", "id": "#s064"}, {"party": "SD", "name": "Jennie \u00c5feldt", "id": "#s065"}, {"party": "M", "name": "J\u00f6rgen Warborn", "id": "#s066"}, {"party": "KD", "name": "Larry S\u00f6der", "id": "#s067"}, {"party": "M", "name": "Lars P\u00fcss", "id": "#s068"}, {"party": "MP", "name": "Elisabeth Falkhaven", "id": "#s069"}, {"party": "KD", "name": "Ingemar Kihlstr\u00f6m", "id": "#s070"}, {"party": "SD", "name": "Caroline Nordengrip", "id": "#s071"}, {"party": "SD", "name": "Runar Filper", "id": "#s072"}, {"party": "S", "name": "Mikael Dahlqvist", "id": "#s073"}, {"party": "M", "name": "Jessica Polfj\u00e4rd", "id": "#s074"}, {"party": "L", "name": "Roger Haddad", "id": "#s075"}, {"party": "S", "name": "Ingemar Nilsson", "id": "#s076"}, {"party": "S", "name": "Kristina Nilsson", "id": "#s077"}, {"party": "S", "name": "Anna-Caren S\u00e4therberg", "id": "#s078"}, {"party": "S", "name": "Kalle Olsson", "id": "#s079"}, {"party": "S", "name": "Maria Jacobsson", "id": "#s079"}, {"party": "MP", "name": "\u00c5sa Lindhagen", "id": "#s080"}, {"party": "M", "name": "Johan Forssell", "id": "#s081"}]
            this.setState({filteredSelection: ledlist})

        }
        
    }

    componentDidMount(){
        d3.select('.riksdags_map').call(this.zoom)
              
    }

    componentDidUpdate(nextProps){
        if(nextProps.groupby != this.props.groupby){
            if(nextProps.groupby == "default" && this.props.groupby == "partiet"){
                this.setTransition()
            }
            else{
                //this.destroyMap()
                //this.forceUpdate()
            }
           
        }
        else if(nextProps.partiBy != this.props.partiBy){
            this.setNewGroup(this.props.partiBy)
        }
        else if(nextProps.searchBy != this.props.searchBy){
            this.setState({filteredSelection: this.props.searchBy})
        }
        else if(nextProps.selectedLedamot != this.props.selectedLedamot){
            this.setState({filteredSelection: [this.props.selectedLedamot]})

        }
    }


    destroyMap = () => {
        d3.select('.riksdags_map').remove();
    }

    

    setTransition = () => {
        let RiksdagStolar = d3.select('.riksdags_map')
        var ypaddingfactor = 0.1;
        var mstolar = 0;
        var sstolar = 0;
        var lstolar = 0;
        var vstolar = 0;
        var mpstolar = 0;
        var kdstolar = 0;
        var sdstolar = 0;
        var cstolar = 0;
        
        RiksdagStolar.select("svg").select("#Welcome").selectAll("path").transition().attr("d", "M508,182 L494,182 C494,182 494,168.612852 494,168.612852 C495.14429,166.980014 497.071117,165 501,165 C504.944852,165 506.85571,166.980014 508,168.612852 C508,168.612852 508,182 508,182 Z", "fill").duration(900)
        setTimeout(() => {
            for (var i=0; i < ledamoter.length; i++ ){
                let path = RiksdagStolar.select("svg").select("#Welcome").select(ledamoter[i].id)
                if(ledamoter[i].party === "M") {
                    path.attr("fill", "#0ebdef")
                    if(mstolar <= 20) {
                        var xpos = -path.node().getBBox().x+0;
                        var ypos = -path.node().getBBox().y*((-ypaddingfactor*mstolar)+1);
                    }
                    else if ((mstolar > 20 && mstolar <= 40)){
                        xpos = -path.node().getBBox().x+25;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(mstolar-21))+1);
                    }
                    else if ((mstolar > 40 && mstolar <= 60)){
                        xpos = -path.node().getBBox().x+50;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(mstolar-41))+1);
                    }
                    else if ((mstolar > 60 && mstolar <= 80)){
                        xpos = -path.node().getBBox().x+75;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(mstolar-61))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    mstolar+=1;
                }
                else if(ledamoter[i].party === "S"){
                    path.attr("fill", "#ff0000")
                    if(sstolar <= 20) {
                        xpos = -path.node().getBBox().x+125;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*sstolar)+1);
                    }
                    else if ((sstolar > 20 && sstolar <= 40)){
                        xpos = -path.node().getBBox().x+150;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-21))+1);
                    }
                    else if ((sstolar > 40 && sstolar <= 60)){
                        xpos = -path.node().getBBox().x+175;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-41))+1);
                    }
                    else if ((sstolar > 60 && sstolar <= 80)){
                        xpos = -path.node().getBBox().x+200;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-61))+1);
                    }
                    else if ((sstolar > 80 && sstolar <= 105)){
                        xpos = -path.node().getBBox().x+225;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sstolar-81))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    sstolar+=1;
                }
                else if(ledamoter[i].party === "L"){
                    path.transition().attr("fill", "#0065b6").duration(1000)
                    xpos = -path.node().getBBox().x+250;
                    ypos = -path.node().getBBox().y*((-ypaddingfactor*lstolar)+1);
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    lstolar+=1;
                }
                else if(ledamoter[i].party === "V"){
                    path.transition().attr("fill", "#ef0000").duration(1000)
                    if(vstolar <= 20) {
                        xpos = -path.node().getBBox().x+375;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*vstolar)+1);
                    }
                    else if ((vstolar > 20 && vstolar <= 40)){
                        xpos = -path.node().getBBox().x+400;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(vstolar-21))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    vstolar+=1;
                }
                else if(ledamoter[i].party === "MP"){
                    path.transition().attr("fill", "#12a846").duration(1000)
                    xpos = -path.node().getBBox().x+500;
                    ypos = -path.node().getBBox().y*((-ypaddingfactor*mpstolar)+1);
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    mpstolar+=1;
                }
                else if(ledamoter[i].party === "KD"){
                    path.transition().attr("fill", "#0059a3").duration(1000)
                    xpos = -path.node().getBBox().x+625;
                    ypos = -path.node().getBBox().y*((-ypaddingfactor*kdstolar)+1);
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    kdstolar+=1;
                }
                else if(ledamoter[i].party === "SD"){
                    path.transition().attr("fill", "#ffca00").duration(1000)
                    if(sdstolar <= 20) {
                        var xpos = -path.node().getBBox().x+750;
                        var ypos = -path.node().getBBox().y*((-ypaddingfactor*sdstolar)+1);
                    }
                    else if ((sdstolar > 20 && sdstolar <= 40)){
                        xpos = -path.node().getBBox().x+775;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sdstolar-21))+1);
                    }
                    else if ((sdstolar > 40 && sdstolar <= 65)){
                        xpos = -path.node().getBBox().x+800;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(sdstolar-41))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    sdstolar+=1;
                }
                else if(ledamoter[i].party === "C"){
                    path.attr("fill", "#00703c")
                    if(cstolar <= 20) {
                        xpos = -path.node().getBBox().x+925;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*cstolar)+1);
                    }
                    else if ((cstolar > 20 && cstolar <= 40)){
                        xpos = -path.node().getBBox().x+950;
                        ypos = -path.node().getBBox().y*((-ypaddingfactor*(cstolar-21))+1);
                    }
                    path.transition().attr("transform", "translate(" + xpos + "," + ypos + ")").duration(1000)
                    cstolar+=1;
                }
            }
          }, 1200);
    }
    render() {
    
        return (
            // <div className="riksdags_map" onClick= {(e) => this.setSeat(e)}>
             <div className="riksdags_map" onClick={(e) => this.setSeat(e)}>
                {this.buildSVG()}
                {this.modifySVG(this.state.filteredSelection)}
                {/* <button onClick={() => this.setTransition()}>Group by party</button>
                <button onClick={() => this.setNewGroup()}>Set new group</button> */}
                <button onClick={this.resetZoom}>reset zoom</button>
            </div>
        )
    }
}