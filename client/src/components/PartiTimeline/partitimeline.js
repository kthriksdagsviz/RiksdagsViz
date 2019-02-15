import React, { Component } from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './partitimeline.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export default class PartiTimeline extends Component{
    constructor(props){
        super(props)
        this.state = {
            hasLoaded: false,
            value:0,
            isPlaying: false, 
            duration: 0,
            min: 2000,
            max: 2019
          }
    }


    render(){
        return(
            <div className="partitimeline_container">
                <div className="playButton"><FontAwesomeIcon icon={faPlayCircle} size="3x"  /> </div>

                <Slider min={this.state.min} max={this.state.max}/>
            </div>
        )
    }
}