import React from 'react';
import _ from 'lodash'
import { requestLedamoterByParams } from '../actions'
import { connect } from 'react-redux'
import { ledamoter_api } from '../services'
import Spinner from 'react-spinkit'

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
        //if ledamoter has not been fetched, fetch them, implement it later
        this.fetchSingleLedamot()
        
    }

    componentDidUpdate(nextProps){
        // console.log(nextProps.ledamoter != this.props.ledamoter)
        // if(this.props.ledamoter.fetched && !_.isEmpty(this.props.ledamoter.list)){
        //     if(nextProps.ledamoter != this.props.ledamoter){
        //         let personlist = this.props.ledamoter.list.person
        //         let personId = this.props.match.params.id;
        //         let a = _.find(this.props.ledamoter.list.person, {'intressent_id':personId})
        //     }
           
        // }
    }

    renderPersonData = () => {
        const { ledamot, error } = this.state
        if(!error){
            return (
                <div >
                    <img src={ledamot.bild_url_192}></img>
                    <p>{ledamot.tilltalsnamn} {ledamot.efternamn} ({ledamot.parti})</p> 
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
                <div> {this.renderPersonData()} </div>}
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
    