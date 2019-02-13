import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestNyheterByParams } from '../actions'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'

 class IndexNews extends Component{


    getLatestNews = (q) => {
        this.props.requestNyheterByParams({
            q:q,
            sortBy:'popularity',
            from:'2019-02-11',
            to: '2019-02-13'
        })
    }

    renderLatestNews = () =>{
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



    componentDidUpdate(nextProps){
        console.log(this.props.ledamot)
        if(!_.isEmpty(this.props.ledamot) && (nextProps.ledamot != this.props.ledamot)){
            let name = this.props.ledamot.tilltalsnamn + " "  + this.props.ledamot.efternamn
            this.getLatestNews(name)
        }
    }

    render(){
        
        const { isFetching, fetched, list } = this.props.nyheter
        const hasFetched = fetched ? fetched : false;
        const hasNews = list.totalResults > 0 ? true : false
        console.log(isFetching, hasFetched)
        const check = (this.props.nyheter.list.totalResults > 0 )
        return (
            <div className="index__voteringar">
                Latest news 

                <button onClick={this.getLatestNews}> Fetch news</button>  
                {!hasFetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div> {check && this.renderLatestNews() }</div>}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    nyheter: state.nyheter,
    ledamot: state.ledamoter.selectedLedamot
  })
  
  const mapDispatchToProps = dispatch => {
    //actions:bindActionCreators(actions, dispatch),
    return {
        requestNyheterByParams: (params) => dispatch(requestNyheterByParams(params))
    }
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(IndexNews);
    