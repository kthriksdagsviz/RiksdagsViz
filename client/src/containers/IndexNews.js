import React, { Component } from 'react';
import { requestNyheterByParams } from '../actions'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import '../styles/indexNews.scss'
import * as moment from 'moment';
import Paper from '@material-ui/core/Paper'

 class IndexNews extends Component{
    constructor(props){
        super(props)
    }

    shortenNewsDescription = (desc) => {
        if (desc.length > 150) {
            return desc.substring(0,149) + '...';
        } else {
            return desc;
        }
    }

    getLatestNews = (q) => {
        this.props.requestNyheterByParams({
            q: q,
            sortBy:'popularity',
            from: moment().subtract(2, 'days').format('YYYY[-]MM[-]DD'),
            to: moment().format('YYYY[-]MM[-]DD')
        })
    }

    componentDidMount(nextProps){
        if(!_.isEmpty(this.props.ledamot)){
            let name = this.props.ledamot.tilltalsnamn + " "  + this.props.ledamot.efternamn
            this.getLatestNews(name)
        }
        
    }

    renderLatestNews = () =>{
        
        const data =  this.props.nyheter.list.articles.map((article, index) => {
        return (
            <div key={index} className="newsBox" elevation={1}>
                <div className="articleImageBox">
                    <img src={article.urlToImage} alt={article.title}></img>
                </div>
                <div className="articleInfoBox">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h4>{article.title}</h4>
                        <p><em>{article.author}</em>, {article.source.name}</p>
                        <p>{this.shortenNewsDescription(article.description)}</p>
                    </a>
                </div>
            </div>
        )
        })
    return data
        
    }

    render(){
        
        const { isFetching, fetched, list } = this.props.nyheter
        const hasNews = list.totalResults > 0 ? true : false
        const check = (this.props.nyheter.list.totalResults > 0 )
        return (
            <div className="index__voteringar">
                 {check && this.renderLatestNews() }
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
    