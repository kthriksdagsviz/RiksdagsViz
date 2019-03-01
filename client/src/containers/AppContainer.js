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
import ReactJoyride, { STATUS } from 'react-joyride';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const steps = [
     
  {
    target: '.riksdags_map',
    disableBeacon: 'true',
    placement:'bottom',
    content: 'Här ser du en visualisering av alla stolarna i Sveriges riksdag! För musmarkören över en stol för att se vem som sitter på den platsen och klicka för mer information.',
  },
  {
    target: '.search-container',
    content: 'Sök på specifika ledamöter! Klicka på en person för att se mer information. Du kan även filtrera på parti och se var dess ledamöter sitter.',
  },
  {
    target: '.fa-users',
    content: 'Här finns en sökfunktion för individuella ledamöter.'
  },
  {
    target: '.fa-chart-pie',
    content: 'Här finns ett diagram med information om hur partierna har röstat i olika frågor, i förhållande till varandra.'
  },
  {
    target: '.fa-grip-horizontal',
    content: 'Här hittar du mer information om varje parti.'
  },
  {
    target: '.fa-info-circle',
    content: 'Här kan du få veta mer om teamet som ligger bakom RiksdagsViz!'
  }
  
]



class AppContainer extends Component {
    constructor(props){
      super(props)
      this.state ={
        runTutorial: false
      }
    }

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

  runTutorial = (e) =>{
    e.preventDefault();
    this.setState({runTutorial:true})
  }

  handleJoyrideCallback = data => {
    const { status, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ runTutorial: false });
    }
    
  };


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
        <div className="root_container">
            <ReactJoyride
              steps={steps}
              scrollToFirstStep
              showProgress
              continuous
              showSkipButton
              autoStart={true}
              run={this.state.runTutorial} // or some other boolean for when you want to start it
              callback={this.handleJoyrideCallback}
              styles={{
                options: {
                  zIndex: 10000,
                }
              }} />

            <div className="tutorialButton">
                <FontAwesomeIcon onClick={this.runTutorial} icon={faQuestionCircle} size="3x" />
            </div> 
        
        <div className="App">
        
          {!fetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <RiksdagsMap ledamoter={this.props.ledamoter} />
                    }
          {/* <IndexInformation /> */}
        
        </div>
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
  