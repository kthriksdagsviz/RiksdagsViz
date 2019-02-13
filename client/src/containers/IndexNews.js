import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestNyheterByParams } from '../actions'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import '../styles/indexNews.css'
import * as moment from 'moment';


 class IndexNews extends Component{

    shortenNewsDescription = (desc) => {
        if (desc.length > 150) {
            return desc.substring(0,149) + '...';
        } else {
            return desc;
        }
    }

    getLatestNews = () => {
        this.props.requestNyheterByParams({
            q:'Ulf Kristersson',
            sortBy:'popularity',
            from: moment().subtract(2, 'days').format('YYYY[-]MM[-]DD'),
            to: moment().format('YYYY[-]MM[-]DD')
        })
    }

    renderLatestNews = () =>{
        if (this.props.nyheter.list.totalResults > 0 ) {
            const data =  this.props.nyheter.list.articles.map((article, index) => {
            return (
                <div key={index} className="newsBox">
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
    