import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'


class Partier extends React.Component{
    constructor(props){
        super(props);
    }

    render(){   
        return(
            <div className="partier_page_container">
                Partier page 
                
            </div>
        )
    }
}

    
  export default connect(null, null)(Partier);
    