import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestLedamoterByParams, setSelectedLedamot } from '../actions'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import RiksdagsSeats from "../components/RiksdagsSeats/RiksdagsSeats"


class RiksdagsMap extends Component {

    fetchData = () => {
        this.props.ledamoterByParams({
            fnamn:"Lars",
            size: 10
        })
    }
    selectLedamot = (person) => {
        this.props.setSelectedLedamot(person)
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

    componentDidMount(){
        this.fetchData()
    }


    render(){
        const { isFetching, fetched } = this.props.ledamoter
        const hasFetched = fetched ? fetched : false;
        return (
            <div className="index__map"> 
            
                {!hasFetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div style={{display:'flex', flexDirection:'row'}}> {this.renderPersonData()} </div>}
                
                <RiksdagsSeats/>
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
    