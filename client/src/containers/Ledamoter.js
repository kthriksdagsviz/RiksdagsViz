import React from 'react';
import { requestLedamoterByParams, setLedamotFetched } from '../actions'
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import LedamotTable from '../components/LedamotTable/LedamotTable';
import _ from 'lodash'


class Ledamoter extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let hasHits = false;
        if(!_.isEmpty(this.props.ledamoter.list)){
            hasHits = parseInt(this.props.ledamoter.list['@hits'] < 1)
        }
       if(!this.props.ledamoter.fetched){
            this.fetchData()
       }
       
        
    }
    componentDidUpdate(nextProps){
        // if(!nextProps.ledamoter.fetched){
        //     this.props.ledamoterByParams({
        //         fnamn:"Peter",
        //         size: 2
        //     })
        // }
    }

    fetchData = () => {
        this.props.ledamoterByParams({
            
        })
    }

    renderPersonData = () => {
        if (this.props.ledamoter.list.person) {
            const data =  this.props.ledamoter.list.person.map((person) => {
            return (
                <div key={person.intressent_id}>
                    <img src={person.bild_url_192}></img>
                    <p>{person.tilltalsnamn} {person.efternamn} ({person.parti})</p> 
                </div>
            )
            })
        return data
        }
    }

    render(){
        const { isFetching, fetched } = this.props.ledamoter
        const hasFetched = fetched ? fetched : false;
        return(
            <div className="ledamot_table_container">
                {!hasFetched ? 
                (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
                <div style={{width:'99%', height:'99%'}}>
                    <LedamotTable data={this.props.ledamoter} />  
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
        ledamoterByParams: (params) => dispatch(requestLedamoterByParams(params)),
        setLedamotFetched: () => dispatch(setLedamotFetched())
    }
}
    
  export default connect(mapStateToProps, mapDispatchToProps)(Ledamoter);
    