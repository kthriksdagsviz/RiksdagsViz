import React from 'react'
import { votering_api } from '../services'
import Spinner from 'react-spinkit'
import {ListGroup, Jumbotron, Container, Table } from 'react-bootstrap'

export default class VoteringPage extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            isFetching: false,
            fetched: false,
            error: false,
            list:{},
            yesVotes:0,
            noVotes:0,
            avstar:0,
            fran: 0,
            total:0
        }
    }
    fetchVotering = () => {
        this.setState({isFetching: true})
        votering_api.getVoteringByVoteringId(this.props.match.params.id)
            .then((data) => {
                if(data){
                    this.setState({list: data, fetched: true, isFetching: false},  () => this.calculateProcentage())
                }
                else{
                    this.setState({fetched: true, isFetching: false, error: true})
                }
        })
    }

    calculateProcentage = () => {
        var yesVotes = 0;
        var noVotes = 0;
        var avstar = 0;
        var fran = 0;
        var total = this.state.list.votering.dokvotering[0].votering.length

        this.state.list.votering.dokvotering[0].votering.forEach(element => {
            switch(element.rost[0]){
                case 'Ja':
                    yesVotes++;
                    break
                case 'Nej':
                    noVotes++;
                    break
                case 'Avstår':
                    avstar++;
                    break
                case 'Frånvarande':
                    fran++
                    break
            }
        });
        this.setState({
            yesVotes,
            noVotes, 
            avstar,
            fran, 
            total
        })
    }

    componentDidMount(){
        this.fetchVotering()
        
    }

    render(){
        const { isFetching, fetched, list } = this.state
        return (
            <div style={!fetched ? {display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}: null}>
            {!fetched ? 
            (isFetching ? <Spinner name="cube-grid"  fadeIn="none" /> : "" ):
            <div style={{padding:'1em'}}> 
            <Container>
            <Jumbotron>
                <h1 style={{marginBottom:'.5em'}}> {list.votering.dokument[0].titel} </h1>
                
                <p> Debattnamn: {list.votering.dokument[0].debattnamn}</p>
                <p> Publicerad: {list.votering.dokument[0].publicerad}</p>

                <section>
                   <p> Procent som röstat Ja:  {(100* this.state.yesVotes / this.state.total).toFixed(2)} %</p>
                   <p> Procent som röstat Nej:  {(100 * this.state.noVotes / this.state.total).toFixed(2)} %</p>
                   <p> Procent som var frånvarande {(100 * this.state.fran / this.state.total).toFixed(2)} %</p>
                   <p> Procent som avstått från att rösta:  {(100 * this.state.avstar / this.state.total).toFixed(2)} %</p>
                </section>
            </Jumbotron>
            <ListGroup>
                <ListGroup.Item> <a href={list.votering.dokbilaga[0].bilaga[0].fil_url}> Länk till fil  </a></ListGroup.Item>
                <ListGroup.Item> <a href={list.votering.dokument[0].dokument_url_html}> Länk till fil i HTML format  </a></ListGroup.Item>
                <ListGroup.Item> <a href={list.votering.dokument[0].utskottsforslag_url_xml}> Länk till utskottsförslag  </a></ListGroup.Item>
                
            </ListGroup>
            </Container>

            </div>}
        </div>
        )
    }
}