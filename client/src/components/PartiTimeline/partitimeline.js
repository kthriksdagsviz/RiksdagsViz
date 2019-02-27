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
            value:2018,
            isPlaying: false, 
            duration: 0,
            min: 2002,
            max: 2018
          }
    }

    _onPlay = () => {
        if (this.state.value === 2018) {
            this.setState({value: 2002});
        }
        this.setState({isPlaying: true})
        this.timeInterval = setInterval(() => this.onUpdateTimeline(), 100)
    }

    _onPaus = () => {
        this.setState({isPlaying: false})
        clearInterval(this.timeInterval)
    }

    onSliderChange = (val) => {
        clearInterval(this.timeInterval)
        this.setState({isPlaying: false})
        this.setState({value: val}, () => this.props.onYearTimelineChange(Math.round(this.state.value)))
    }

    onUpdateTimeline = () => {
        if(this.state.value + 0.05 <= this.state.max){
            this.setState({value: this.state.value + 0.05}, 
                () => {
                    let yearToChangeTo = Math.round(this.state.value)
                    this.props.onYearTimelineChange(yearToChangeTo)
                })
        }
        else{
            clearInterval(this.timeInterval)
            this.setState({isPlaying: false})
        }
        
    }


    render(){
        return(
            <div className="partitimeline_container">
                <div className="playButton">
                { this.state.isPlaying ? 
                    <FontAwesomeIcon icon={faPauseCircle} size="3x" onClick={this._onPaus}/> :
                    <FontAwesomeIcon icon={faPlayCircle} size="3x" onClick={this._onPlay}/> 
                }
                </div>

                <Slider min={this.state.min} max={this.state.max} value={this.state.value} step={1} onChange={this.onSliderChange} />
            </div>
        )
    }
}