import React, { Component } from 'react'
import IndexLedamot from './IndexLedamot'
import IndexNews from './IndexNews'


export default class IndexInformation extends Component{
    render(){
        return (
            <div className="IndexInformation">
                <IndexLedamot />
                <IndexNews />
          </div>
        )
    }
}