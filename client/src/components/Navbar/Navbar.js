import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faLandmark, faLayerGroup, faRunning, faHandshake } from '@fortawesome/free-solid-svg-icons'
import './navbar.scss'

export default () => (
    <div className="navbar_container" >
        <Link to="/"> 
            <div className="navbar_link_home">
                <FontAwesomeIcon icon={faLandmark} size="3x" color="white" /> 
            </div>
        </Link>
        <Link to="/ledamoter">
            <div className="navbar_link_ledamoter">
            <FontAwesomeIcon icon={faRunning} size="3x" color="white" />      
            </div> 
        </Link>
        <Link to="/partier">
            <div className="navbar_link_partier">
                <FontAwesomeIcon icon={faLayerGroup} size="3x" color="white" />   
            </div> 
        </Link>
        <Link to="/parties">
            <div className="navbar_link_parties">
                <FontAwesomeIcon icon={faHandshake} size="3x" color="white" />   
            </div> 
        </Link>
        <Link to="/about">
            <div className="navbar_link_about">
                <FontAwesomeIcon icon={faQuestionCircle} size="3x" />
            </div> 
        </Link>
    </div>
)