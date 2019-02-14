import React, { Component } from 'react';
import Attendance from '../components/Attendance';

class Hello extends Component {
    render() {
      return (
        <div className="about_container">
          <h1> About page </h1>
          <Attendance></Attendance>
        </div>
      );
    }
  }
  
  export default Hello;
  