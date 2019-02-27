import React, { Component } from 'react'
import { requestLedamoterByParams, setSelectedLedamot } from '../actions'
import { connect } from 'react-redux'
import RiksdagsSeats from "../components/RiksdagsSeats/RiksdagsSeats"
import Riksdagsfilter from '../components/Riksdagsfilter/Riksdagsfilter';
import {ledamoter_api} from '../services'

class RiksdagsMap extends Component {
    constructor(props){
        super(props)
        this.state={
            groupby:"default",
            parti:"None",
            search:"",
            selectedFromFilter:"",
            selectedLedamotFromSeats:{
                id:"",
                fname:"",
                ename:""
            }
        }
    }
    fetchData = () => {
        this.props.ledamoterByParams({
            fnamn:"Lars",
            size: 10
        })
    }
    selectLedamot = (person) => {
        if(!person){
            let person ={
                tilltalsnamn: "Oscar",
                efternamn: "Wiigh",
                parti: "M",
                bild_url_80: "http://data.riksdagen.se/filarkiv/bilder/ledamot/9f5c5d35-c450-4068-923a-2d8d077223d5_80.jpg"
            }
            person = this.props.ledamoter.list.person[0]
            this.props.setSelectedLedamot(person)
        }
        else{
            this.props.setSelectedLedamot(person)
        }
        
    }

    fetchSingleLedamot = (fname, ename, seat) => {
        let p ={
            id: seat,
            fname: fname, 
            ename: ename
        }
        this.setState({isFetching: true, selectedLedamotFromSeats: p})
        ledamoter_api.getLedamoterByName({
            fname: fname, ename: ename
        }).then((data) => {
             this.props.setSelectedLedamot(data.personlista.person)
        })
    }

    renderPersonData = () => {
        if (this.props.ledamoter.list.person) {
            const data =  this.props.ledamoter.list.person.map((person) => {
            return (
                <div key={person.intressent_id}>
                    <img src={person.bild_url_192} onClick={() => this.selectLedamot(person)}></img>
                    <p>{person.tilltalsnamn} {person.efternamn} ({person.parti})</p> 
                </div>
            )
            })
        return data
        }
    }

    onGroupByChange = (groupBy) => {
        this.setState({groupby: groupBy})
    }

    onPartiChange = (parti) => {
        this.setState({parti: parti})
    }
    onSearchChange = (search) => {
        this.setState({search})
    }

    onSelectedLedamotChange = (ledamot) =>{
        this.setState({selectedFromFilter: ledamot})
    }



    componentDidMount(){
        //this.fetchData()
    }


    render(){
        const { isFetching, fetched } = this.props.ledamoter
        const hasFetched = fetched ? fetched : false;
        return (
            <div className="index__map"> 
            
                {/* {!hasFetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div style={{display:'flex', flexDirection:'row'}}> {this.renderPersonData()} </div>} */}
                <Riksdagsfilter 
                    ledamoter={this.props.ledamoter}
                    changeGroupBy={this.onGroupByChange} 
                    changeParti={this.onPartiChange} 
                    selectedLedamotFromSeats={this.state.selectedLedamotFromSeats}
                    onSelectedLedamotChange ={this.onSelectedLedamotChange}
                    onSearchChange={this.onSearchChange} 
                    selectLedamot={this.fetchSingleLedamot} 
                    parti={this.state.parti}/>
                <RiksdagsSeats 
                    selectLedamot={this.fetchSingleLedamot}
                    selectedLedamot={this.state.selectedFromFilter}
                    groupby={this.state.groupby} 
                    partiBy={this.state.parti} 
                    searchBy={this.state.search} />
            {/* <RiksdagsSearch/> */}
            
          </div>
        )
    }
}


const mapStateToProps = state => ({
    ledamoter: state.ledamoter
  })
  
const mapDispatchToProps = dispatch => {
//actions:bindActionCreators(actions, dispatch),
    return {
        ledamoterByParams: (params) => dispatch(requestLedamoterByParams(params)),
        setSelectedLedamot: (params) => dispatch(setSelectedLedamot(params))
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(RiksdagsMap);
    