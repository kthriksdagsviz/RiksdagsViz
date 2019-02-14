import React, { Component } from 'react'
import * as d3 from 'd3'
import partyList from './PartiCompareRawData'

const createInteger = (string) => {
    var parsed = parseInt(string, 10);
    if (isNaN(parsed)) { return 0 }
    return parsed;
}

const voteByParty = () => {
    // [V, S, MP, C, L, KD, M SD]
    var partyListOut = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    /* let partyNameList = ['V', 'S', 'MP', 'C', 'L', 'KD', 'M', 'SD']; */
    for (var i = 0; i < partyList.length; i++) {
        for (var j = i + 1; j < partyList.length; j++) {
            for (var k = 0; k < partyList[i].length; k++) {
                let partyIn1 = partyList[i][k];
                delete partyIn1.votering_id;
                delete partyIn1.Frånvarande;
                let partyIn2 = partyList[j][k];
                delete partyIn2.votering_id;
                delete partyIn2.Frånvarande;
                let party1 = Object.keys(partyIn1).reduce(function (a, b) { return partyIn1[a] > partyIn1[b] ? a : b });
                let party2 = Object.keys(partyIn2).reduce(function (a, b) { return partyIn2[a] > partyIn2[b] ? a : b });
                partyListOut[i][j] += createInteger(partyIn1[party2]);
                partyListOut[j][i] += createInteger(partyIn2[party1]);
            }
        }
    }
    return partyListOut;
}

/* const checkPartyVotes = (checkIn) => {
    // stuff
} */

export default class PartiCompare extends Component {
    state = {
        partyStuff: ''
    }
    
    componentDidMount(){
        /* console.log(partyList); */
        console.log(voteByParty());
    }

    



    render() {
        return (
            <div id="compareContainer">
                <div id="compareChart"/>
            </div>
        )
    }
}