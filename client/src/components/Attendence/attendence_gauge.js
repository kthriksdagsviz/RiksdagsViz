import React from 'react'
import LiquidFillGauge from 'react-liquid-gauge';
import { interpolateRgb } from 'd3-interpolate';
import { color } from 'd3-color';
import { votering_api } from '../../services'
export default class AttendenceGauge extends React.Component{
    state = {
        value: 0
    };
    startColor = '#6495ed'; // cornflowerblue
    endColor = '#dc143c'; // crimson


    fetchAttendance = (ledamot) => {
        this.setState({isFetching: true})
        votering_api.getLedamotVoteringById(ledamot.intressent_id).then((data) => {
            let path = data.voteringlista.votering[0];
            let kvot = path.Frånvarande[0] / (parseInt(path.Avstår[0]) + parseInt(path.Frånvarande[0]) + parseInt(path.Ja[0]) + parseInt(path.Nej[0]));
            let procent = 100 - kvot*100;
            this.setState({value: procent})
        })
    }

    componentDidMount(){
        this.fetchAttendance(this.props.ledamot)
    }

    render() {
        const radius = 100;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

        return (
            <div>
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={this.state.value}
                    percent="%"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 3);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.2
                        };
                        const attStyle={
                            fontSize: textPixels * 0.5
                        }

                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                    <tspan style={percentStyle}>{props.percent}</tspan>
                                    <tspan x="0" y={radius/2} style={attStyle}>Attendence</tspan>

                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: fillColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                    
                />
                
            </div>
        );
    }
}