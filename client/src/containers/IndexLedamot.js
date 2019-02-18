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
import LedamotComponent from '../components/LedamotComponent/ledamotcomponent';

class IndexLedamot extends Component{


    renderLedamot = () => {
        if(!_.isEmpty(this.props.ledamot)){
            const {ledamot} = this.props 
            return (
                <LedamotComponent ledamot={ledamot} />
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
    