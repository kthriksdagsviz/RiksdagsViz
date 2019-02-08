import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestVoteringarById } from '../actions'

import { connect } from 'react-redux'

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
          <h1> This is home route</h1>
          <button onClick={() => this.onButtonClick()}> Fetch from api </button>
          
          {voteringar.isFetching ? <span> Loading indicator...</span> :
            <ul>
            {/* { voteringar.fetched && this.renderVoteringar()} */}
            
            </ul>
          }
          
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
  