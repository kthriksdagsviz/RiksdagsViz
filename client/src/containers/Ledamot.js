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
import LedamotInfo from './LedamotInfo';

class Ledamot extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            ledamot: {},
            isFetching: false,
            fetched: false,
            error: false,
            attendence:0,
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
            if(data['@hits'] > 0){
                this.setState({ledamot: data.person[0], fetched: true, isFetching: false})
                this.fetchAttendance(data.person[0])
            }
            else{
                this.setState({fetched: true, isFetching: false, error: true})
            }
            
        })
    }

    fetchAttendance = (ledamot) => {
        this.setState({isFetching: true})
        votering_api.getLedamotVoteringById(ledamot.intressent_id).then((data) => {
            var path = data.voteringlista.votering[0];
            var kvot = path.Frånvarande[0] / (parseInt(path.Avstår[0]) + parseInt(path.Frånvarande[0]) + parseInt(path.Ja[0]) + parseInt(path.Nej[0]));
            var procent = 100 - kvot*100;
            var num = Math.round(procent * 10) / 10;
            this.setState({attendence: num})
            
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
            this.setState({ledamot: persistedLedamot, fetched:true})
            this.fetchAttendance(persistedLedamot)
        }
        else{
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
                        <LedamotComponent ledamot={ledamot} numberOfVotes={this.state.voteringar.thisYear} votering={this.state.attendence} />
                        
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
                <div style={{display:'flex', flexDirection:'row', height:'100vh', overflowY:'auto'}}> 
                    
                  <div style={{width:'100%', height:'100%', overflowY:'auto'}}>  {this.renderPersonData()} </div>
                  <div > <LedamotInfo ledamot={this.state.ledamot} /> </div>
                {/* <AttendenceGauge ledamot={this.state.ledamot} /> */}
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
    