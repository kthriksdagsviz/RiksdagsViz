import React, { Component } from 'react'
import PartiCompare from '../components/PartiCompare'
import PartiTimeline from '../components/PartiTimeline/partitimeline';

class Parti extends Component {
    render() {
      return (
        
        <div className="parti_container">
          <div className="parti_compare">
            <PartiCompare />
          </div>
          <div>
            <PartiTimeline />
          </div>
        </div>
      );
    }
  }
  
  export default Parti;