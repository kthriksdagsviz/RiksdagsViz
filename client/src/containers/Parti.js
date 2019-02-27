import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import SweMap from "../components/SweMap/SweMap.js"
import { ledamoter_api } from '../services'
import { requestLedamoterByParty } from '../actions'
import DonutChart from 'react-d3-donut';
import partyColors from '../styles/colors.scss'

class PartiPage extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            genderData: [],
            isFetching: false,
            fetched: false,
            error: false,
            ledamoter:{},
            valkrets:{}
        }
    }

    fetchLedamoter = () => {
        this.setState({isFetching: true})
        ledamoter_api.getLedamoterByParty(this.props.match.params.parti
        ).then((data) => {
            var k=0;
            var m=0;
            var temp = [];
            var valkretsList = {};
            var valkretsar = {"Blekinge län":"K" ,"Dalarnas län":"W",
                              "Gotlands län":"I","Gävleborgs län":"X","Göteborgs kommun":"O",
                              "Hallands län":"N","Jämtlands län":"Z",
                              "Jönköpings län":"F","Kalmar län":"H",
                              "Kronobergs län":"G","Malmö kommun":"M","Norrbottens län":"BD",
                              "Skåne läns norra och östra":"M","Skåne läns södra":"M","Skåne läns västra":"M",
                              "Stockholms län":"AB","Stockholms kommun":"AB",
                              "Södermanlands län":"D","Uppsala län":"C",
                              "Värmlands län":"S","Västerbottens län":"AC",
                              "Västernorrlands län":"Y","Västmanlands län":"U",
                              "Västra Götalands läns norra":"O","Västra Götalands läns västra":"O","Västra Götalands läns östra":"O",
                              "Västra Götalands läns södra":"O","Örebro län":"T",
                              "Östergötlands län":"E"}
                            
            if(data['@hits'] > 0){
                temp = [];
                valkretsList = {};
                for (var i = 0; i < data.person.length; i++) {
                    if (data.person[i].kon == 'kvinna'){
                        k += 1;
                    }
                    else {
                        m += 1;
                    }
                    if (data.person[i].valkrets) {
                        var key = valkretsar[data.person[i].valkrets];
                        //valkretsList.push(valkretsar[data.person[i].valkrets]);
                        if (!(key in valkretsList)) {
                            valkretsList[key] = 1;
                        }
                        else {
                            valkretsList[key] += 1;
                        }
                    }
                }
                this.setState({genderData: [{name: "Antal Män",count: Math.round((m/(m+k))*100),color: '#00BFFF'},{name: "Antal Kvinnor",count: Math.round((k/(m+k))*100),color: '#FF69B4'}]});
                for (var j = 0; j < temp.length; j++) {
                    valkretsList.push(valkretsar[temp[j]]);
                }
                this.setState({valkrets: valkretsList})
                this.setState({ledamoter: data.person, fetched: true, isFetching: false})
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
        var a = [{name: "Antal Män", count: 71, color: "#00BFFF"},{name: "Antal Kvinnor", count: 29, color: "#FF69B4"}];
        return(
            <div className="parti_page_container">
                <img src={process.env.PUBLIC_URL +  '/parties_loggor/' + match.params.parti + '.png'} alt="PartyLogo"  width="10%"/>
                {match.params.parti}
                <SweMap valkrets={this.state.valkrets} color={partyColors["party" + match.params.parti]}/>
                <DonutChart
                    innerRadius={90}
                    outerRadius={100}
                    transition={true}
                    svgClass="example1"
                    pieClass="pie1"
                    displayTooltip={true}
                    strokeWidth={3}
                    data={a} />
                
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
    