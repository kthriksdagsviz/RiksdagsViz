import React, { Component } from 'react'
import IndexLedamot from './IndexLedamot'
import IndexVotering from './IndexVoteringar'


export default class IndexInformation extends Component{
    render(){
        return (
            <div className="IndexInformation">
                <IndexLedamot />
                <IndexVotering />
          </div>
        )
    }
}