import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import ReactJoyride, { STATUS } from 'react-joyride';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const steps = [
     
    {
      target: '.riksdags_map',
      disableBeacon: 'true',
      placement:'bottom',
      content: 'Welcome to my visualization! Follow these steps to learn more about the World Value Surveys and Gapminder. Press the red circles to learn how to use this visualization!',
    },
    {
      target: '.search-container',
      content: 'Welcome to my visualization! Follow these steps to learn more about the World Value Surveys and Gapminder. Press the red circles to learn how to use this visualization!',
    },
    
  ]


class PartiPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            runTutorial: false
        }
    }
    componentDidMount(){
        let parties =["M", "KD", "S", "SD", "MP", "V", "L", "C"]
        if(!parties.includes(this.props.match.params.parti)){
                this.props.push('/parties')
            
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

    render(){ 
        const { match } = this.props;  
        return(
            <div className="parti_page_container">
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

            <div style={{position:'absolute', top:'10px', right:'10px'}}>
                <FontAwesomeIcon onClick={this.runTutorial} icon={faQuestionCircle} size="3x" />
            </div> 

            
                <img src={process.env.PUBLIC_URL +  '/parties_loggor/' + match.params.parti + '.png'} alt="PartyLogo"  width="40%"/>
                Parti page {match.params.parti}

            </div>
        )
    }
}

    
  export default connect(null, {push})(PartiPage);
    