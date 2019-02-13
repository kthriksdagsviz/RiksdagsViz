import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import '../styles/navbar.scss'

export default () => (
    <div className="navbar_container" >
        <Link to="/"> 
            <div className="navbar_link_home">
                <img src={process.env.PUBLIC_URL + '/riksdagslogo.png'}/>    
            </div>
        </Link>
        <Link to="/ledamoter">
            <div className="navbar_link_ledamoter">
                Ledamoter   
            </div> 
        </Link>
        <Link to="/hello">
            <div className="navbar_link_info">
                 Hello   
            </div> 
        </Link>

        <Link to="/about">
            <div className="navbar_link_about">
                <FontAwesomeIcon icon={faQuestionCircle} size="3x" />
            </div> 
        </Link>
    </div>
)