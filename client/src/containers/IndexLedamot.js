import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestLedamoterByParams } from '../actions'
import { connect } from 'react-redux'
import '../styles/indexLedamot.scss'
import _ from 'lodash'

import '../styles/colors.scss'

class IndexLedamot extends Component{


    renderLedamot = () => {
        if(!_.isEmpty(this.props.ledamot)){
            const {ledamot} = this.props 
            return (
                <div className={`ledamot_container bg-${ledamot.parti}`}>
                    <svg id="cardBanner" viewBox="0 0 200 150" preserveAspectRatio="none" transform="scale(1.35,0.75)"> 
                        <path d="M 152.876 68.568 C 151.816 69.158 149.519 69.31 149.519 69.31 L 0 69.31 L 0 4.417 L 181.263 4.417 C 181.263 4.417 187.615 4.447 189.112 8.297 C 190.567 12.043 188.044 14.34 188.044 14.34 L 155.66 65.648 C 155.66 65.648 154.099 67.888 152.876 68.568 Z"/>
                        {/* <path id="bannerShadow" d="M4.264 69 L30 69 L30 95 Z" /> */}
                    </svg>
                    <div id="cardTitle">
                        <h1>{ledamot.tilltalsnamn} {ledamot.efternamn} ( {ledamot.parti} )</h1> 
                        <p>{ledamot.status}</p>
                    </div>
                    <div id="cardHead">
                        <img src={ledamot.bild_url_80} alt="Avatar"/> 
                    </div>

                    <div id="cardStat">
                        <div><h1>77</h1><p>Votes<br/>2018/19</p></div>
                        <div><h1>23</h1><p>Lorem ipsum<br/>2018/19</p></div>
                        <div><h1>90%</h1><p>Attendance<br/>2018/19</p></div>
                    </div>

                    <div id="cardVote">
                        <h2>Latest votes</h2>  
                        <ul>
                            <li><p>2018/19: FiU14, votering punkt 2, sakfrågan, ja</p></li>
                            <li><p>2018/19: FiU14, votering punkt 3, sakfrågan, ja</p></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render(){
        return (
            <div className="index__ledamot">
                {this.renderLedamot()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ledamot: state.ledamoter.selectedLedamot
  })
  
const mapDispatchToProps = dispatch => {
//actions:bindActionCreators(actions, dispatch),
    return {
        ledamoterByParams: (params) => dispatch(requestLedamoterByParams(params))
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(IndexLedamot);
    