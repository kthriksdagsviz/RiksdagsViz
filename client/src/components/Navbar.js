import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <div style={{height:'100%', backgroundColor:'gray', position:'fixed', width:'50px', top:0}}> 
        <Link to="/"> Home </Link>
        <Link to="/hello"> Hello </Link>
    </div>
)