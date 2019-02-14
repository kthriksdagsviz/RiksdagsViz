import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'


class Parti extends React.Component{
    constructor(props){
        super(props);
    }

    render(){ 
        const { match } = this.props;  
        return(
            <div className="parti_page_container">
                Parti page {match.params.parti}
            </div>
        )
    }
}

    
  export default connect(null, null)(Parti);
    