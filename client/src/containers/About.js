import React, { Component } from 'react';
import SweMap from '../components/SweMap/SweMap';

class Hello extends Component {
    render() {
      return (
        <div className="about_container">
          <h1> About page </h1>
          <SweMap/>
        </div>
      );
    }
  }
  
  export default Hello;
  