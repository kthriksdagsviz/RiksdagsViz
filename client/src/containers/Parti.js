import React from 'react';
import { connect } from 'react-redux'
import  Spinner  from 'react-spinkit'
import _ from 'lodash'
import { push } from 'connected-react-router'

class PartiPage extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let parties =["M", "KD", "S", "SD", "MP", "V", "L", "C"]
        if(!parties.includes(this.props.match.params.parti)){
            console.log("not a parti")
                this.props.push('/parties')
            
        }
    }

    render(){ 
        const { match } = this.props;  
        return(
            <div className="parti_page_container">
                <img src={process.env.PUBLIC_URL +  '/parties_loggor/' + match.params.parti + '.png'} alt="PartyLogo"  width="40%"/>
                Parti page {match.params.parti}

            </div>
        )
    }
}

    
  export default connect(null, {push})(PartiPage);
    