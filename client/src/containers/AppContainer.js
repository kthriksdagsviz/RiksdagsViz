import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestVoteringarById, requestLedamoterByParams } from '../actions'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import RiksdagsMap from './RiksdagsMap'
import IndexInformation from './IndexInformation';
import Spinner from 'react-spinkit'
import _ from 'lodash'
import '../styles/index.scss'

class AppContainer extends Component {


    onButtonClick = () => {
      this.props.voteringarById("F06B69C1-265A-4916-86FD-C03C1C3BB334");
    }

    renderVoteringar = () => {
      return(
        this.props.voteringar.list.map(vot => (
          <li key={vot.id}>{vot.votering_id}, {vot.namn}</li>
        ))
      )
    }

    componentDidMount(){
      let hasHits = false;
      if(!_.isEmpty(this.props.ledamoter.list)){
          hasHits = parseInt(this.props.ledamoter.list['@hits'] < 1)
      }
     if(!this.props.ledamoter.fetched){
          this.fetchData()
     }
     
      
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
      this.props.ledamoterByParams({})
  }
      
       


    render() {
      const { isFetching, fetched } = this.props.ledamoter

      return (
        <div className="App">
        {!fetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <RiksdagsMap ledamoter={this.props.ledamoter} />
                    }
          {/* <IndexInformation /> */}
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  ledamoter: state.ledamoter

})

const mapDispatchToProps = dispatch => {
  //actions:bindActionCreators(actions, dispatch),
  return {
    voteringarById: (id) => dispatch(requestVoteringarById(id)),
    ledamoterByParams: (params) => dispatch(requestLedamoterByParams(params)),

  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
  