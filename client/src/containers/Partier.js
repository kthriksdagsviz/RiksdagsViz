import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import "../styles/partier.scss"

class Partier extends React.Component{
    constructor(props){
        super(props);
    }

    render(){   
        return(
            <div className="partier_page_container">
                Riksdagspartier
                <div className="grid-container">
                    <div><Link to='/partier/M'><img src='partyLogos/m.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/partier/SD'><img src='partyLogos/sd.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/partier/L'><img src='partyLogos/l.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/partier/KD'><img src='partyLogos/kd.jpg' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/partier/C'><img src='partyLogos/c.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/partier/S'><img src='partyLogos/s.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/partier/V'><img src='partyLogos/v.png' alt="PartyLogo"  width="40%"/></Link></div>
                    <div><Link to='/partier/MP'><img src='partyLogos/mp.png' alt="PartyLogo"  width="40%"/></Link></div>
                </div>
            </div>
        )
    }
}

    
  export default connect(null, null)(Partier);
    