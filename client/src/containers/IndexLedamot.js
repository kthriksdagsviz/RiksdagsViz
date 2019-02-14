import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestLedamoterByParams } from '../actions'
import { connect } from 'react-redux'
import Media from 'react-bootstrap/Media'
import '../styles/indexLedamot.scss'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import '../styles/colors.scss'

class IndexLedamot extends Component{


    renderLedamot = () => {
        if(!_.isEmpty(this.props.ledamot)){
            const {ledamot} = this.props 
            return (
                
                <div className="ledamot_container">
                    <div className="cardHead">
                        <Media>
                            <Media.Body className={`cardTitle bg-${ledamot.parti}`}>
                                <h1>{ledamot.tilltalsnamn} {ledamot.efternamn} ( {ledamot.parti} )</h1>
                                <p>{ledamot.status}</p>
                            </Media.Body>
                            <Link to={'/ledamoter/' + ledamot.intressent_id}><img src={ledamot.bild_url_80} alt="Avatar"/> </Link>
                        </Media>
                    </div>

                    <div className="cardStat">
                        <div><h1>77</h1><p>Votes<br/>2018/19</p></div>
                        <div><h1>23</h1><p>Lorem ipsum<br/>2018/19</p></div>
                        <div><h1>90%</h1><p>Attendance<br/>2018/19</p></div>
                    </div>

                    <div className="cardVote">
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
    