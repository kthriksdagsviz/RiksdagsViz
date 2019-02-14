import React, { Component } from 'react'
import PartiCompare from '../components/PartiCompare'

class Parti extends Component {
    render() {
      return (
        <div className="parti_container">
          <h1>Parti page</h1>
          <PartiCompare />
        </div>
      );
    }
  }
  
  export default Parti;