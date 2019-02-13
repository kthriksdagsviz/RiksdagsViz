import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestNyheterByParams } from '../actions'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'


 class IndexNews extends Component{


    getLatestNews = () => {
        this.props.requestNyheterByParams({
            q:'Annie Lööf',
            sortBy:'popularity',
            from:'2019-02-11',
            to: '2019-02-13'
        })
    }

    renderLatestNews = () =>{
        if (this.props.nyheter.list.totalResults > 0 ) {
            const data =  this.props.nyheter.list.articles.map((article, index) => {
            return (
                <div key={index}>
                    <img src={article.urlToImage}></img>
                    <p>{article.author} {article.title} ({article.description})</p> 
                </div>
            )
            })
        return data
        }
    }

    render(){
        
        const { isFetching, fetched, list } = this.props.nyheter
        const hasFetched = fetched ? fetched : false;
        const hasNews = list.totalResults > 0 ? true : false
        
        return (
            <div className="index__voteringar">
                Latest news 

                <button onClick={this.getLatestNews}> Fetch news</button>  
                {!hasFetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div> {this.renderLatestNews()} </div>}
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
    
  export default connect(mapStateToProps, mapDispatchToProps)(IndexNews);
    