import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import SweMap from "../components/SweMap/SweMap.js"
import { ledamoter_api } from '../services'
import { requestLedamoterByParty } from '../actions'

class PartiPage extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            isFetching: false,
            fetched: false,
            error: false,
            ledamoter:{}
        }
    }

    fetchLedamoter = () => {
        this.setState({isFetching: true})
        console.log(this.props.match.params.parti);
        ledamoter_api.getLedamoterByParty(this.props.match.params.parti
        ).then((data) => {
            if(data['@hits'] > 0){
                this.setState({ledamoter: data, fetched: true, isFetching: false})
                console.log(this.state.ledamoter)
            }
            else{
                this.setState({fetched: true, isFetching: false, error: true})
            }
            
        })
    }

    componentDidMount(){
        let parties =["M", "KD", "S", "SD", "MP", "V", "L", "C"]
        if(!parties.includes(this.props.match.params.parti)){
            console.log("not a parti")
                this.props.push('/parties')
        }
        this.fetchLedamoter();

    }

    render(){ 
        const { match } = this.props;  
        return(
            <div className="parti_page_container">
                <img src={process.env.PUBLIC_URL +  '/parties_loggor/' + match.params.parti + '.png'} alt="PartyLogo"  width="10%"/>
                {match.params.parti}
                <SweMap/>
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
        ledamoterByParty: (params) => dispatch(requestLedamoterByParty(params))
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(PartiPage);
    