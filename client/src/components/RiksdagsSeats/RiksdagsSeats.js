import React, { Component } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import ledamoter from "../../utils/ledamoter.json"
import * as d3 from 'd3';
import {ledamoter_api} from '../../services'
import _ from 'lodash'
import {zoom } from 'd3-zoom'
import './RiksdagsSeats.scss'
import RiksdagsModal from '../RiksdagsModal/RiksdagsModal.js';

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
            lastHoveredSeat:{
                id:"",
                fname:"",
                ename:""
            },
            showToolTip:false,
            toolTipStyle:{
                top: 0,
                left: 0
            },
            zoom:0.9,
            open: false
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
        var map = <SvgLoader path="/RiksdagStolar.svg" style={{width:'100%', height:'80%', marginTop:'3em'}}></SvgLoader>
        
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
            
            let seatId = e.target.id;
            this.setState({
                selectedSeat: '#' + e.target.id,
                selectedName: result[0].name
            }, () => this.props.selectLedamot(fname, ename, seatId))
        }
        else {
            RiksdagStolar.select("svg").select("#Welcome").selectAll(".glow").attr("fill", "gray").style("filter", null).classed("glow", false)
            RiksdagStolar.select("svg").select("#Welcome").selectAll("path").attr("fill-opacity", 1)
            this.setState({
                open: false,
                selectedSeat: "",
                selectedName: ""
            }, () => this.props.selectLedamot("", ""))
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
        // d3.select('.riksdags_map').call(this.zoom)
              
    }
    toggled = () => {
        this.props.selectLedamot("", "")
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
            if(this.props.selectedLedamot){
                let object ={
                    target:{
                        id: this.props.selectedLedamot.id.slice(1)
                    }
                }
                this.setSeat(object)

            }
            else if(this.props.selectedLedamot == ""){
                let object ={
                    target:{
                        id: ""
                    }
                }
                this.setSeat(object)
            }
            this.setState({filteredSelection: [this.props.selectedLedamot]})
        }
        else if(nextProps.modalPerson != this.props.modalPerson){
            this.setState({open: true})
        }
    }


    destroyMap = () => {
        d3.select('.riksdags_map').remove();
    }

    hoverOnSeat = (e) =>{
        let RiksdagStolar = d3.select('.riksdags_map')
        if(e.target.id !== "") {
            let filteredledamot = ledamoter.filter(ledamot => {
                return ledamot.id === "#"+e.target.id
            })
            RiksdagStolar.select("svg").select("#Welcome").select("#"+e.target.id).attr("fill", filteredledamot[0].color)
            
            let fname = filteredledamot[0].name.split(" ")[0];
              let ename = filteredledamot[0].name.split(" ")[1];
            
            let seatId = e.target.id;
            this.setState({lastHoveredSeat: {
                id: seatId,
                fname,
                ename
            }})
            let style = {
                top: e.clientY - 75,
                left: e.clientX - 98
            }

            if(this.state.lastHoveredSeat != e.target.id){
                this.setState({toolTipStyle: style})
            }
            this.setState({showToolTip:  true})
            
        }else{
            if(this.state.lastHoveredSeat.id != e.target.id){
                RiksdagStolar.select("svg").select("#Welcome").selectAll("path").attr("fill", "gray")
                // clearTimeout(this.interval)
                this.setState({showToolTip: false})
            }
            
        }
    }

   

    render() {
        return (
             <div className="riksdags_map" onClick={(e) => this.setSeat(e)} onMouseOver={(e) => this.hoverOnSeat(e)} >
                {this.buildSVG()}
                {this.modifySVG(this.state.filteredSelection)}
            {this.state.open && <RiksdagsModal open={this.state.open} modalPerson={this.props.modalPerson} toggled={this.toggled}/>}
           {this.state.showToolTip && (
           <div> <div className="seat_tooltip" style={this.state.toolTipStyle}>
                <p> {this.state.lastHoveredSeat.fname}  {this.state.lastHoveredSeat.ename} </p>
                {/* <div className="arrow"> </div> */}
            </div>
            
           </div>)}
            </div>
        )
    }
}