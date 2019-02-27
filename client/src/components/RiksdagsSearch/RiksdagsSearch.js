/* eslint-disabled */
import React, { Component } from 'react'
import './RiksdagsSearch.scss'
import seatData from '../../utils'

export default class RiksdagsSearch extends Component {
    constructor(){
        super();
        this.state = {
            search: '',
            dropDown: ''
        }
    }

    updateSearch(event) {
        this.setState({search:event.target.value})
    }

    updateDropDown(event) {
        this.setState({dropDown:event.target.value})
    }

    render(){
        let filteredData = seatData.filter(
            seatData => {
                return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && seatData.party.toLowerCase().indexOf(this.state.dropDown.toLowerCase()) !== -1;
            }
        );
        return (
            <div className="search-container">
                <input type="text" placeholder="Search.." name="search"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}/>
                <select id="dropdown">
                    <option value="">All Parties</option>
                    <option value="s">Socialdemokraterna</option>
                    <option value="m">Moderaterna</option>
                    <option value="c">Centerpartiet</option>
                    <option value="l">Liberalerna</option>
                    <option value="mp">Miljöpartiet</option>
                    <option value="v">Vänsterpartiet</option>
                    <option value="kd">Kristdemokraterna</option>
                    <option value="sd">Sverigedemokraterna</option>
                </select>
                <button type="submit" onClick={console.log(filteredData)}>Submit</button>
            </div>
        )
    }

    
}