import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faLandmark, faLayerGroup, faRunning, faHandshake } from '@fortawesome/free-solid-svg-icons'
import './navbar.scss'

export default () => (
    <div className="navbar_container" >
        <Link to="/"> 
            <div className="navbar_link_home" title="Hem">
                <FontAwesomeIcon icon={faLandmark} size="3x" color="white" /> 
            </div>
        </Link>
        <Link to="/ledamoter">
            <div className="navbar_link_ledamoter" title="Ledamöter">
            <FontAwesomeIcon icon={faRunning} size="3x" color="white" />      
            </div> 
        </Link>
        <Link to="/partier">
            <div className="navbar_link_partier" title="Voteringslikhet mellan partier">
                <FontAwesomeIcon icon={faLayerGroup} size="3x" color="white" />   
            </div> 
        </Link>
        <Link to="/parties">
            <div className="navbar_link_parties" title="Partier">
                <FontAwesomeIcon icon={faHandshake} size="3x" color="white" />   
            </div> 
        </Link>
        <Link to="/about">
            <div className="navbar_link_about" title="Om RiksdagsViz">
                <FontAwesomeIcon icon={faUsers} size="3x" />
            </div> 
        </Link>
    </div>
)