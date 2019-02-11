import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <div style={{height:'100%', backgroundColor:'gray', position:'fixed', width:'100px', top:0, display:'flex', flexDirection:'column'}}> 
        <Link to="/"> Home </Link>
        <Link to="/hello"> Hello </Link>
        <Link to="/ledamoter"> Ledamoter </Link>
    </div>
)