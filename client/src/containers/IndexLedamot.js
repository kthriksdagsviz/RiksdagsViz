import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as actions from '../actions'
import { requestLedamoterByParams } from '../actions'
import { requestVoteringarById } from '../actions'
import { connect } from 'react-redux'
import { votering_api } from '../services'
import Media from 'react-bootstrap/Media'
import '../styles/indexLedamot.scss'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import '../styles/colors.scss'
import LedamotComponent from '../components/LedamotComponent/ledamotcomponent';

class IndexLedamot extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            ledamot: {},
            attendance: 0,
            isFetching: false,
            fetched: false,
            error: false
        }
      }

      fetchAttendance = (ledamot) => {
        this.setState({isFetching: true})
        votering_api.getLedamotVoteringById(ledamot.intressent_id).then((data) => {
            var path = data.voteringlista.votering[0];
            var kvot = path.Frånvarande[0] / (parseInt(path.Avstår[0]) + parseInt(path.Frånvarande[0]) + parseInt(path.Ja[0]) + parseInt(path.Nej[0]));
            var procent = 100 - kvot*100;
            var num = Math.round(procent * 10) / 10;
            this.setState({attendance: num})
        })
    }

    componentDidMount() {
        if(!_.isEmpty(this.props.ledamot)){
            const {ledamot} = this.props
            this.fetchAttendance(ledamot);
        }
      }
      componentDidUpdate(nextProps) {
        if(!_.isEmpty(this.props.ledamot) && (nextProps.ledamot != this.props.ledamot)){
            const {ledamot} = this.props
            this.fetchAttendance(ledamot);
        }
      }

    renderLedamot = () => {
        if(!_.isEmpty(this.props.ledamot)){
            const {ledamot} = this.props
            return (
                <LedamotComponent ledamot={ledamot} votering={this.state.attendance}/>
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
        ledamoterByParams: (params) => dispatch(requestLedamoterByParams(params)),
        voteringarById: (id) => dispatch(requestVoteringarById(id))
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(IndexLedamot);
    