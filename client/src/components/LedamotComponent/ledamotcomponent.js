import React from 'react'
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media'
import '../../styles/indexLedamot.scss'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const LedamotComponent = ({ledamot, votering}) => (         
    <div className="ledamot_container">
        <div className="cardHead">
            <Media>
                <Media.Body className={`cardTitle bg-${ledamot.parti}`}>
                    <h1>{ledamot.tilltalsnamn} {ledamot.efternamn} ( <Link to={'/partier/' + ledamot.parti}>{ledamot.parti} </Link> )</h1>
                    <p>{ledamot.status}</p>
                </Media.Body>
                <Link to={'/ledamoter/' + ledamot.intressent_id}><img src={ledamot.bild_url_80} alt="Avatar"/> </Link>
            </Media>
        </div>

        <div className="cardStat">
            <div><h1>77</h1><p>Votes<br/>2018/19</p></div>
            <div><h1>23</h1><p>Lorem ipsum<br/>2018/19</p></div>
            <div><h1>{votering}</h1><p>Attendance<br/>2018/19</p></div>
        </div>

        <div className="cardVote">
            <h2>Latest votes</h2>  
            <ul>
                <li><p>2018/19: FiU14, votering punkt 2, sakfrågan, ja</p></li>
                <li><p>2018/19: FiU14, votering punkt 3, sakfrågan, ja</p></li>
            </ul>
        </div>
    </div>    
)

LedamotComponent.propTypes = {
    ledamot: PropTypes.object.isRequired
}
export default LedamotComponent;