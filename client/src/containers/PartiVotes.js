import React, { Component } from 'react'
import PartiCompare from '../components/PartiCompare'
import PartiTimeline from '../components/PartiTimeline/partitimeline';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import { requestVoteringarByYear } from '../actions'
import PartiChord from '../components/PartiChord'
import _ from 'lodash'
class Parti extends Component {
    state = {
      selectedYear:2018,
      yearReadyToChange: false,

    }

    setHeadlineYear(){
      var nextYearString = this.state.selectedYear.toString().slice(-2);
      var nextYear = parseInt(nextYearString, 10) + 1;
      if (nextYear < 10) {
        nextYearString = '0' + nextYear.toString();
      } else {
        nextYearString = nextYear.toString();
      }
      return this.state.selectedYear + '/' + nextYearString;
    }

    componentDidMount(){
      var parties = ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD'];
      if(!this.props.voteringar.fetched){
       // this.props.voteringarByYear("2018/19,2017/18,2016/17", parties)
      }
      else if(this.props.voteringar.fetched && _.isEmpty(this.props.voteringar.list)){
        //this.props.voteringarByYear("2018/19,2017/18,2016/17", parties)
      }
      else{
        //this.props.voteringarByYear("2018/19,2017/18,2016/17", parties)
      }

      
    }

    onYearChange = (year) => {
      this.setState({yearReadyToChange: true})
    }
    
    onYearTimelineChange = (year) => {
      this.setState({selectedYear: year})
    }

    render() {
      const { isFetching, fetched } = this.props.voteringar
      var headLineYear = this.setHeadlineYear();
      return (
        
        <div className="parti_container">

                <div style={{width:'99%', height:'99%'}}>
                    <h4 style={{textAlign: 'center', marginTop: '10px'}}>Riksmöte: { headLineYear }</h4>
                    <div className="parti_compare">
                      <PartiChord  onYearChange={this.onYearChange} selectedYear={this.state.selectedYear}/>
                      {/* <PartiCompare data={this.props.voteringar.list['2018/19']} onYearChange={this.onYearChange} selectedYear={this.state.selectedYear} /> */}
                    </div>  
                </div>

          
          <div>
            <PartiTimeline onYearTimelineChange={this.onYearTimelineChange} />
          </div>
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
        voteringarByYear: (years, parties) => dispatch(requestVoteringarByYear(years, parties)),
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(Parti);
    