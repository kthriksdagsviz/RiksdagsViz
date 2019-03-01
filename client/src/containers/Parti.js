import React from 'react';
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import SweMap from "../components/SweMap/SweMap.js"
import { ledamoter_api } from '../services'
import { requestLedamoterByParty } from '../actions'
import DonutChart from 'react-d3-donut';
import partyColors from '../styles/colors.scss'
import MaterialTable from 'material-table'

class PartiPage extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            genderData: [{name: "Antal Män", count: 0, color: "#BCE9DB"},{name: "Antal Kvinnor", count: 0, color: "#FF815C"}],
            ageData: [{name: "20-årsåldern", count: 0, color: "#FF0046"},{name: "30-årsåldern", count: 0, color: "#FF8C00"},{name: "40-årsåldern", count: 0, color: "#FFCA00"},{name: "50-årsåldern", count: 0, color: "#00E055"},{name: "60-årsåldern", count: 0, color: "#1BC5FB"},{name: "70-årsåldern", count: 0, color: "#0069FE"},{name: "80-årsåldern", count: 0, color: "#5F3BD6"}],
            isFetching: false,
            fetched: false,
            error: false,
            ledamoter: [{ "name": "Annie Lööf", "id": 73, "party": "C" }],
            valkrets: {},
            valkretsNum: []
        }
    }

    fetchLedamoter = () => {
        this.setState({ isFetching: true })
        ledamoter_api.getLedamoterByParty(this.props.match.params.parti
        ).then((data) => {
            var k = 0;
            var m = 0;
            var temp = [];
            var ålder = [];
            var valkretsList = {};
            var valkretsNum = [];
            var valkretsar = {"Blekinge län":"Blekinge" ,"Dalarnas län":"Dalarna",
                              "Gotlands län":"Gotland","Gävleborgs län":"Gävleborg","Göteborgs kommun":"Västra Götaland",
                              "Hallands län":"Halland","Jämtlands län":"Jämtland",
                              "Jönköpings län":"Jönköping","Kalmar län":"Kalmar",
                              "Kronobergs län":"Kronoberg","Malmö kommun":"Skåne","Norrbottens län":"Norrbotten",
                              "Skåne läns norra och östra":"Skåne","Skåne läns södra":"Skåne","Skåne läns västra":"Skåne",
                              "Stockholms län":"Stockholm","Stockholms kommun":"Stockholm",
                              "Södermanlands län":"Södermanland","Uppsala län":"Uppsala",
                              "Värmlands län":"Värmland","Västerbottens län":"Västerbotten",
                              "Västernorrlands län":"Västernorrland","Västmanlands län":"Västmanland",
                              "Västra Götalands läns norra":"Västra Götaland","Västra Götalands läns västra":"Västra Götaland","Västra Götalands läns östra":"Västra Götaland",
                              "Västra Götalands läns södra":"Västra Götaland","Örebro län":"Orebro",
                              "Östergötlands län":"Östergötland"}


            var counties = {
                "Blekinge": { name: "Blekinge län", num: 0 }, "Dalarna": { name: "Dalarnas län", num: 0 },
                "Gotland": { name: "Gotlands län", num: 0 }, "Gävleborg": { name: "Gävleborgs län", num: 0 },
                "Halland": { name: "Hallands län", num: 0 }, "Jämtland": { name: "Jämtlands län", num: 0 },
                "Jönköping": { name: "Jönköpings län", num: 0 }, "Kalmar": { name: "Kalmar län", num: 0 },
                "Kronobegrs": { name: "Kronobergs län", num: 0 }, "Norrbotten": { name: "Norrbottens län", num: 0 },
                "Skåne": { name: "Skåne län", num: 0 }, "Stockholm": { name: "Stockholms län", num: 0 },
                "Södermanland": { name: "Södermanlands län", num: 0 }, "Uppsala": { name: "Uppsala län", num: 0 },
                "Värmland": { name: "Värmlands län", num: 0 }, "Västerbotten": { name: "Västerbottens län", num: 0 },
                "Västernorrland": { name: "Västernorrlands län", num: 0 }, "Västmanland": { name: "Västmanlands län", num: 0 },
                "Västra Götaland": { name: "Västra Götalands län", num: 0 }, "Orebro": { name: "Örebro län", num: 0 },
                "Östergötland": { name: "Östergötlands län", num: 0 }
            }
                            
            if(data['@hits'] > 0){
                temp = [];
                valkretsList = {};
                valkretsNum = [];
                for (var i = 0; i < data.person.length; i++) {
                    if (data.person[i].kon == 'kvinna') {
                        k += 1;
                    }
                    else{
                        m += 1;
                    }
                    if (data.person[i].valkrets) {
                        var key = valkretsar[data.person[i].valkrets];
                        var name = data.person[i].valkrets;
                        //valkretsList.push(valkretsar[data.person[i].valkrets]);
                        if (!(key in valkretsList)) {
                            valkretsList[key] = 1;
                        }
                        else {
                            valkretsList[key] += 1;
                            counties[key].num += 1;
                        }
                    }
                    ålder.push(Math.floor((2019 - data.person[i].fodd_ar)/10)*10)
                }
                for (var n = 0; n < ålder.length; n++) {   
                    for (var l=0; l < this.state.ageData.length; l++) {
                        if (ålder[n].toString() == this.state.ageData[l].name.slice(0,2)){
                            this.state.ageData[l].count += 1;
                        }
                    }
                }
                this.setState({genderData: [{name: "Antal Män",count: m,color: '#51539a'},{name: "Antal Kvinnor",count: k,color: '#e56b33'}]});
                for (var j = 0; j < temp.length; j++) {
                    valkretsList.push(valkretsar[temp[j]]);
                }
                for (key in counties) {
                    valkretsNum.push(counties[key]);
                }
                this.setState({ valkrets: valkretsList })
                this.setState({ ledamoter: data.person, valkrets: valkretsList, valkretsNum: valkretsNum, fetched: true, isFetching: false })
            }
            else {
                this.setState({ fetched: true, isFetching: false, error: true })
            }
        })
    }

    componentDidMount() {
        let parties = ["M", "KD", "S", "SD", "MP", "V", "L", "C"]
        if (!parties.includes(this.props.match.params.parti)) {
            console.log("not a parti")
            this.props.push('/parties')
        }
        this.fetchLedamoter();

    }

    handleSelect = (event, rowData) => {
        console.log(rowData)
        this.props.push('/ledamoter/' + rowData.intressent_id)
    }

    render() {
        const { match } = this.props;
        return (
            <div className="parti_page_container" style={{ textAlign: 'center' }}>
                <div style={{ width: '100%' }}>
                    <img src={process.env.PUBLIC_URL + '/parties_loggor/' + match.params.parti + '.png'} alt="PartyLogo" width="10%" />
                </div>
                <div style={{ width: '100%' }}>
                    <div style={{ width: '50%', display: 'inline-block', verticalAlign: 'top', marginTop: '20px' }}>
                        <MaterialTable
                            columns={[
                                { title: 'Län', field: 'name' },
                                { title: 'Antal ledamöter', field: 'num',type: 'numeric', defaultSort: 'desc' }
                            ]}
                            data={this.state.valkretsNum}
                            title="Ledamöter/län"
                            options={{
                                paging: true,
                                pageSize: 5,
                                searchable: true
                            }}
                        />
                    </div>
                    <div style={{ width: '50%', display: 'inline-block', verticalAlign: 'top' }}>
                        <SweMap valkrets={this.state.valkrets} color={partyColors["party" + match.params.parti]} />
                    </div>
                </div>
                <div style={{textAlign: 'center', width: '100%'}}>
                    <div style={{display:"inline-block", width: '50%'}}>
                        <DonutChart
                            innerRadius={90}
                            outerRadius={100}
                            transition={true}
                            svgClass="genderDistribution"
                            pieClass="pie1"
                            displayTooltip={true}
                            strokeWidth={3}
                            data={this.state.genderData} />
                        <p style={{display: "inline-block", fontFamily: "Rubik"}}>Könsfördelning<br/>i partiet</p>
                    </div>
                    <div style={{display:"inline-block", width: '50%'}}>
                        <DonutChart
                            innerRadius={90}
                            outerRadius={100}
                            transition={true}
                            svgClass="ageDistribution"
                            pieClass="pie2"
                            displayTooltip={true}
                            strokeWidth={3}
                            data={this.state.ageData} />
                        <p style={{display: "inline-block", fontFamily: "Rubik"}}>Åldersfördelning<br/>i partiet</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    <MaterialTable
                        columns={[
                            {
                                title: 'Bild', field: 'bild_url_80',
                                render: rowData => {
                                    return (
                                        <img style={{ borderRadius: '100%', height: '45px' }} src={rowData.bild_url_80}></img>
                                    )
                                }
                            },
                            { title: 'Tilltalsnamn', field: 'tilltalsnamn' },
                            { title: 'Efternamn', field: 'efternamn' },
                            { title: 'Födelseår', field: 'fodd_ar' },
                            { title: 'Valkrets', field: 'valkrets' },
                        ]}
                        data={this.state.ledamoter}
                        title="Ledamöter"
                        options={{
                            paging: true,
                            pageSize: 10,
                            searchable: true
                        }}
                        onRowClick={this.handleSelect}
                    />
                </div>
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
