import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import SweMap from "../components/SweMap/SweMap.js"
import { ledamoter_api } from '../services'
import { requestLedamoterByParty } from '../actions/index.js';

class PartiInfo extends React.Component{
    constructor(props){
        super(props);
    }

    fetchLedamoter = () => {
        this.setState({isFetching: true})
        ledamoter_api.getLedamoterByParty().then((data) => {
            console.log(data);
        })
    }

    componentDidMount(){
        this.fetchLedamoter()
    }

    render(){   
        return(
            <div className="partier_page_container">
                Partier page 
                <SweMap></SweMap>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    ledamoter: state.ledamoter
})

const mapDispatchToProps = dispatch => {
//actions:bindActionCreators(actions, dispatch),
    return {
        ledamoterByParty: () => dispatch(requestLedamoterByParty()),
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(PartiInfo);
    