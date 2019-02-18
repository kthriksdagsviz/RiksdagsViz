import React, { Component } from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './partitimeline.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'

export default class PartiTimeline extends Component{
    constructor(props){
        super(props)
        this.state = {
            hasLoaded: false,
            value:2000,
            isPlaying: false, 
            duration: 0,
            min: 2000,
            max: 2019
          }
    }

    _onPlay = () => {
        this.setState({isPlaying: true})
        this.timeInterval = setInterval(() => this.onUpdateTimeline(), 1000)
    }

    _onPaus = () => {
        this.setState({isPlaying: false})
        clearInterval(this.timeInterval)
    }

    onUpdateTimeline = () => {
        console.log("called every 1 s");
        if(this.state.value + 1 <= this.state.max){
            this.setState({value: this.state.value + 1})
        }
        
    }


    render(){
        return(
            <div className="partitimeline_container">
                {this.state.value}
                <div className="playButton">
                { this.state.isPlaying ? 
                    <FontAwesomeIcon icon={faPauseCircle} size="3x" onClick={this._onPaus}/> :
                    <FontAwesomeIcon icon={faPlayCircle} size="3x" onClick={this._onPlay}/> 
                }
                </div>

                <Slider min={this.state.min} max={this.state.max} value={this.state.value}/>
            </div>
        )
    }
}