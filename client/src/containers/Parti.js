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
        this.state = {
            genderData: [{ name: "Antal Män", count: 0, color: "#BCE9DB" }, { name: "Antal Kvinnor", count: 0, color: "#FF815C" }],
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
            var valkretsList = {};
            var valkretsNum = [];
            var valkretsar = {
                "Blekinge län": "K", "Dalarnas län": "W",
                "Gotlands län": "I", "Gävleborgs län": "X", "Göteborgs kommun": "O",
                "Hallands län": "N", "Jämtlands län": "Z",
                "Jönköpings län": "F", "Kalmar län": "H",
                "Kronobergs län": "G", "Malmö kommun": "M", "Norrbottens län": "BD",
                "Skåne läns norra och östra": "M", "Skåne läns södra": "M", "Skåne läns västra": "M",
                "Stockholms län": "AB", "Stockholms kommun": "AB",
                "Södermanlands län": "D", "Uppsala län": "C",
                "Värmlands län": "S", "Västerbottens län": "AC",
                "Västernorrlands län": "Y", "Västmanlands län": "U",
                "Västra Götalands läns norra": "O", "Västra Götalands läns västra": "O", "Västra Götalands läns östra": "O",
                "Västra Götalands läns södra": "O", "Örebro län": "T",
                "Östergötlands län": "E"
            }
            var counties = {
                "K": { name: "Blekinge län", num: 0 }, "W": { name: "Dalarnas län", num: 0 },
                "I": { name: "Gotlands län", num: 0 }, "X": { name: "Gävleborgs län", num: 0 },
                "N": { name: "Hallands län", num: 0 }, "Z": { name: "Jämtlands län", num: 0 },
                "F": { name: "Jönköpings län", num: 0 }, "H": { name: "Kalmar län", num: 0 },
                "G": { name: "Kronobergs län", num: 0 }, "BD": { name: "Norrbottens län", num: 0 },
                "M": { name: "Skåne län", num: 0 }, "AB": { name: "Stockholms län", num: 0 },
                "D": { name: "Södermanlands län", num: 0 }, "C": { name: "Uppsala län", num: 0 },
                "S": { name: "Värmlands län", num: 0 }, "AC": { name: "Västerbottens län", num: 0 },
                "Y": { name: "Västernorrlands län", num: 0 }, "U": { name: "Västmanlands län", num: 0 },
                "O": { name: "Västra Götalands län", num: 0 }, "T": { name: "Örebro län", num: 0 },
                "E": { name: "Östergötlands län", num: 0 }
            }

            if (data['@hits'] > 0) {
                temp = [];
                valkretsList = {};
                valkretsNum = [];
                for (var i = 0; i < data.person.length; i++) {
                    if (data.person[i].kon == 'kvinna') {
                        k += 1;
                    }
                    else if (data.person[i].kon == 'man') {
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
                }
                this.setState({ genderData: [{ name: "Antal Män", count: Math.round((m / (m + k)) * 100), color: '#51539a' }, { name: "Antal Kvinnor", count: Math.round((k / (m + k)) * 100), color: '#e56b33' }] });
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
        this.props.push('/ledamoter/' + rowData.intressent_id)
    }

    render() {
        const { match } = this.props;
        var a = [{ name: "Antal Män", count: 71, color: "#BCE9DB" }, { name: "Antal Kvinnor", count: 29, color: "#FF815C" }];
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
                <div style={{ width: '100%'}}>
                    <DonutChart
                        innerRadius={90}
                        outerRadius={100}
                        transition={true}
                        svgClass="example1"
                        pieClass="pie1"
                        displayTooltip={true}
                        strokeWidth={3}
                        data={this.state.genderData} />
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
