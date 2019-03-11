import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import "../styles/partier.scss"
import partyColors from "../styles/colors.scss"

import {Jumbotron, Container} from 'react-bootstrap'
class Partier extends React.Component{
    constructor(props){
        super(props);
    }

    render(){   
        return(
            <div className="partier_page_container">
                <Jumbotron>
                    <h1>Sveriges riksdagspartier!</h1>
                    <p> För att utforska ett parti, klicka på dess partilogga.</p>
                   
                </Jumbotron>
                <div className="grid-container">
                    <div>
                        <Link style={{textDecoration:'none'}} to='/parties/L'>
                            <img src={process.env.PUBLIC_URL + 'parties_loggor/L.png'} alt="PartyLogo"  width="40%"/>
                            <h3 style={{marginTop: '1em', color:partyColors["partyL"]}}> Liberalerna</h3>

                            </Link>
                    </div>
                    <div><Link style={{textDecoration:'none'}} to='/parties/S'>
                        <img src={process.env.PUBLIC_URL + 'parties_loggor/S.png'} alt="PartyLogo"  width="40%"/>
                        <h3 style={{marginTop: '1em', color:partyColors["partyS"]}}> Socialdemokraterna</h3>
                        </Link></div>
                    <div><Link style={{textDecoration:'none'}} to='/parties/SD'>
                        <img src={process.env.PUBLIC_URL + 'parties_loggor/SD.png'} alt="PartyLogo"  width="40%"/>
                        <h3 style={{marginTop: '1em', color:partyColors["partySD"]}}> Sverigedemokraterna</h3>
                    </Link></div>
                    <div><Link style={{textDecoration:'none'}} to='/parties/V'>
                        <img src={process.env.PUBLIC_URL + 'parties_loggor/V.png'} alt="PartyLogo"  width="40%"/>
                        <h3 style={{marginTop: '1em', color:partyColors["partyV"]}}> Vänsterpartiet</h3>
                    </Link></div>
                    <div><Link style={{textDecoration:'none'}} to='/parties/MP'>
                        <img src={process.env.PUBLIC_URL + 'parties_loggor/MP.png'} alt="PartyLogo"  width="40%"/>
                        <h3 style={{marginTop: '1em', color:partyColors["partyMP"]}}> Miljöpartiet</h3>
                        </Link></div>
                    <div><Link  style={{textDecoration:'none'}} to='/parties/M'>
                        <img src={process.env.PUBLIC_URL + 'parties_loggor/M.png'} alt="PartyLogo"  width="40%"/>
                        <h3 style={{marginTop: '1em', color:partyColors["partyM"]}}> Moderata samlingsförbundet</h3>
                        </Link></div>
                    <div><Link style={{textDecoration:'none'}} to='/parties/C'>
                        <img src={process.env.PUBLIC_URL + 'parties_loggor/C.png'} alt="PartyLogo"  width="40%"/>
                        <h3 style={{marginTop: '1em', color:partyColors["partyC"]}}> Centerpartiet</h3>
                        </Link></div>
                    <div><Link style={{textDecoration:'none'}} to='/parties/KD'>
                        <img src={process.env.PUBLIC_URL + 'parties_loggor/KD.png'} alt="PartyLogo"  width="40%"/>
                        <h3 style={{marginTop: '1em', color:partyColors["partyKD"]}}> Kristdemokraterna</h3>
                        </Link></div>
                </div>
            </div>
        )
    }
}

    
  export default connect(null, null)(Partier);
    