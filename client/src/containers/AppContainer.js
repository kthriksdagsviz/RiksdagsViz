import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestVoteringarById } from '../actions'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import RiksdagsMap from './RiksdagsMap'
import IndexInformation from './IndexInformation';

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
      
       


    render() {

      const { voteringar } = this.props; 
      return (
        <div className="App">
          <RiksdagsMap />
          <IndexInformation />
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  voteringar: state.voteringar
})

const mapDispatchToProps = dispatch => {
  //actions:bindActionCreators(actions, dispatch),
  return {
    voteringarById: (id) => dispatch(requestVoteringarById(id))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
  