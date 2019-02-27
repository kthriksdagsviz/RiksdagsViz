import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

class PartiInfo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){   
        return(
            <div className="partier_page_container">
                Partier page 
                <ul>
                    <li><Link to='/partier/M'> Moderaterna</Link></li>
                    <li><Link to='/partier/SD'> Sverigedemokraterna</Link></li>
                    <li><Link to='/partier/L'> Liberalerna</Link></li>
                    <li><Link to='/partier/KD'> Kristdemokraterna</Link></li>
                    <li><Link to='/partier/S'> Socialdemokraterna</Link></li>
                    <li><Link to='/partier/V'> Vänsterpartiet</Link></li>

                </ul>
            </div>
        )
    }
}

    
  export default connect(null, null)(PartiInfo);
    