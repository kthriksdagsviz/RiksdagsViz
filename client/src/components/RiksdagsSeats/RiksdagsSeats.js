import React, { Component } from 'react'
import { Samy, SvgProxy } from 'react-samy-svg';

export default class RiksdagsSeats extends Component {
    render() {
        console.log(process.env.PUBLIC_URL);
        return (
            <div>
                <Samy path="/RiksdagStolar.svg">
                    <SvgProxy selector="#s349, #s348" fill={"green"} />
                </Samy>;
                            testing
          </div>
        )
    }
}