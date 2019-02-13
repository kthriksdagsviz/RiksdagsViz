import React, { Component } from 'react'
import RiksdagsSeats from "../components/RiksdagsSeats/RiksdagsSeats"

export default class RiksdagsMap extends Component {
    render(){
        return (
            <div className="index__map"> 
                <RiksdagsSeats/>
          </div>
        )
    }
}