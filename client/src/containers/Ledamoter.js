import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestLedamoterByParams } from '../actions'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'

class Ledamoter extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // if(!this.props.fetched)
        // {
        //     this.props.ledamoterByParams({
        //     fnamn:"Peter",
        //     size: 2
        // })
        // }
    }
    componentDidUpdate(nextProps){
        // if(!nextProps.ledamoter.fetched){
        //     this.props.ledamoterByParams({
        //         fnamn:"Peter",
        //         size: 2
        //     })
        // }
    }

    fetchData = () => {
        this.props.ledamoterByParams({
            fnamn:"lars",
            size: 0
        })
    }

    renderPersonData = () => {
            const data =  this.props.ledamoter.list.person.map((person) => {
            return (
                <div key={person.intressent_id}>
                    <img src={person.bild_url_192}></img>
                    <p>{person.tilltalsnamn} {person.efternamn} ({person.parti})</p> 
                </div>
            )
            })
        return data
    }

    render(){
        const { isFetching, fetched } = this.props.ledamoter
        const hasFetched = fetched ? fetched : false;
        return(
            <div>
                <button onClick={this.fetchData}> Fetch </button>
                {!hasFetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div> {this.renderPersonData()} </div>}
                
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
      ledamoterByParams: (params) => dispatch(requestLedamoterByParams(params))
    }
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Ledamoter);
    