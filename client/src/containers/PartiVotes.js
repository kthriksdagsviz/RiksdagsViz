import React, { Component } from 'react'
import PartiCompare from '../components/PartiCompare'
import PartiTimeline from '../components/PartiTimeline/partitimeline';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import { requestVoteringarByYear } from '../actions'
import _ from 'lodash'
class Parti extends Component {


    componentDidMount(){
      var parties = ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD'];
      if(!this.props.voteringar.fetched){
        this.props.voteringarByYear("2018/19,2017/18,2016/17", parties)
      }
      else if(this.props.voteringar.fetched && _.isEmpty(this.props.voteringar.list)){
        this.props.voteringarByYear("2018/19,2017/18,2016/17", parties)
      }
      else{
        this.props.voteringarByYear("2018/19,2017/18,2016/17", parties)
      }

      
    }

    render() {
      const { isFetching, fetched } = this.props.voteringar
      return (
        
        <div className="parti_container">

                {!fetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div style={{width:'99%', height:'99%'}}>
                    <div className="parti_compare">
                      <PartiCompare data={this.props.voteringar.list['2018/19']}/>
                    </div>  
                </div>}

          
          <div>
            <PartiTimeline />
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
    