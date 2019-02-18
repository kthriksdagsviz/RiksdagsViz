import React from 'react';
import _ from 'lodash'
import { requestLedamoterByParams, setSelectedLedamot } from '../actions'
import { connect } from 'react-redux'
import { ledamoter_api } from '../services'
import Spinner from 'react-spinkit'
import Attendance from '../components/Attendance';
import LedamotComponent from '../components/LedamotComponent/ledamotcomponent';

class Ledamot extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            ledamot: {},
            isFetching: false,
            fetched: false,
            error: false
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

       
        
    }


    renderPersonData = () => {
        const { ledamot, error } = this.state
        if(!error){
            return (
                <div style={{margin:'0 1em 0 0'}}>
                     <div className="ledamot_component_container">
                        <LedamotComponent ledamot={ledamot} />
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
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}> {this.renderPersonData()}<Attendance ledamot={this.state.ledamot}/></div>}
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
    