import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import "../styles/partier.scss"
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
                    <p> För att utforksa ett parti, klicka på dess partilogga.</p>
                   
                </Jumbotron>
                <div className="grid-container">
                    <div><Link to='/parties/M'><img src='parties_loggor/M.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/parties/SD'><img src='parties_loggor/SD.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/parties/L'><img src='parties_loggor/L.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/parties/KD'><img src='parties_loggor/KD.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/parties/C'><img src='parties_loggor/C.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/parties/S'><img src='parties_loggor/S.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/parties/V'><img src='parties_loggor/V.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/parties/MP'><img src='parties_loggor/MP.png' alt="PartyLogo"  width="40%"/></Link></div>
                </div>
            </div>
        )
    }
}

    
  export default connect(null, null)(Partier);
    