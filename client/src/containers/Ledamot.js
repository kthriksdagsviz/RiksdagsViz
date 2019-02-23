import React from 'react';
import _ from 'lodash'
import { requestLedamoterByParams, setSelectedLedamot } from '../actions'
import { connect } from 'react-redux'
import { ledamoter_api, votering_api } from '../services'
import Spinner from 'react-spinkit'
import Attendance from '../components/Attendance';
import LedamotComponent from '../components/LedamotComponent/ledamotcomponent';
import LedamotVoteringTable from '../components/LedamotVoteringTable/ledamot_votering_table'
import AttendenceGauge from '../components/Attendence/attendence_gauge'

class Ledamot extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            ledamot: {},
            isFetching: false,
            fetched: false,
            error: false,
            voteringar:{
                fetched: false,
                isFetching: false,
                list:{},
                thisYear:0
            }
        }
    }

    fetchSingleLedamot = () => {
        this.setState({isFetching: true})
        ledamoter_api.getLedamoterByParams({
            iid: this.props.match.params.id
        }).then((data) => {
            console.log(data)
            if(data['@hits'] > 0){
                this.setState({ledamot: data.person[0], fetched: true, isFetching: false})
            }
            else{
                this.setState({fetched: true, isFetching: false, error: true})
            }
            
        })
    }

    fetchLedamotVoteringar = () => {
        this.setState(prevState => ({
            voteringar: {
                ...prevState.voteringar,
                isFetching: true
            }
        }))
        votering_api.getVoteringarByParams(this.props.match.params.id)
            .then((data) => {
                console.log(data)
                if(data){
                    let item = {
                        ...this.state.voteringar,
                        fetched: true,
                        isFetching:false,
                        list:data
                    }
                    this.setState({voteringar:item})
                }
        })
        
        votering_api.getNumberOfVotesByLedamot(this.props.match.params.id)
            .then((data) => {
                if(data){
                    this.setState(prevState => ({
                        voteringar: {
                            ...prevState.voteringar,
                            thisYear: data
                        }
                    }))
                }
            })
    }

    componentDidMount(){
        let personId = this.props.match.params.id;

        //get the person from the redux store
        let persistedLedamot = _.find(this.props.ledamoter.list.person, {'intressent_id':personId})
        //if that person is not defined, fetch new, otherwise just set state with that person
        if(!_.isEmpty(persistedLedamot)){
            console.log("get from store")
            this.setState({ledamot: persistedLedamot, fetched:true})
        }
        else{
            console.log("get from store")
            this.fetchSingleLedamot()
        }
        if(!(this.state.voteringar.fetched)){
            this.fetchLedamotVoteringar()
        }
    }


    renderPersonData = () => {
        const { ledamot, error } = this.state
        if(!error){
            return (
                <div style={{margin:'0 1em 0 0'}}>
                     <div className="ledamot_component_container">
                        <LedamotComponent ledamot={ledamot} numberOfVotes={this.state.voteringar.thisYear} />
                        
                    </div>

                    <div style={{textAlign:'center'}}>
                    {!this.state.voteringar.fetched ? 
                        (this.state.voteringar.isFetching ? <Spinner name="line-scale"  fadeIn="none" style={{marginTop: '1em'}} /> : "" ):
                        <LedamotVoteringTable data={ledamot.ledamot} voteringar={this.state.voteringar.list} />}
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    There is no ledamot with that id!
                </div>
            )
        }
        
        
        
    }

    render(){
        const { isFetching, fetched } = this.state
        const hasFetched = fetched ? fetched : false;
        return(
            <div>
                {!hasFetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}> {this.renderPersonData()}
                <AttendenceGauge ledamot={this.state.ledamot} />
                {/* <Attendance ledamot={this.state.ledamot}/> */}
                </div>}
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
        ledamoterByParams: (params) => dispatch(requestLedamoterByParams(params))
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(Ledamot);
    