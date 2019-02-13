import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.scss'

export default () => (
    <div className="navbar_container" >
        <Link to="/"> 
            <div className="navbar_link_home">
                Home    
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

        <Link to="/hello">
            <div className="navbar_link_about">
                 About   
            </div> 
        </Link>
    </div>
)