import React, { Component } from 'react';
import googleTrends from 'google-trends-api';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestNyheterByParams } from '../actions'
import { connect } from 'react-redux'

 class IndexVotering extends Component{


    renderLatestNews = () => {
        this.props.requestNyheterByParams({
            q:'Annie Lööf',
            sortBy:'popularity',
            from:'2019-02-11',
            to: '2019-02-13'
        })
        
    }

    render(){
        const { news } = this.props;

        const hasNews = news ? true : false;

        return (
            <div className="index__voteringar">
                Latest news 

                <button onClick={this.renderLatestNews}> Fetch news</button>  
            </div>
        )
    }
}


const mapStateToProps = state => ({
    nyheter: state.nyheter
  })
  
  const mapDispatchToProps = dispatch => {
    //actions:bindActionCreators(actions, dispatch),
    return {
        requestNyheterByParams: (params) => dispatch(requestNyheterByParams(params))
    }
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(IndexVotering);
    