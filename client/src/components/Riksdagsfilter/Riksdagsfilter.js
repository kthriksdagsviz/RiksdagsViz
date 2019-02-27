/* eslint-disabled */
import React, { Component } from 'react'
import seatData from '../../utils'

import './Riksdagsfilter.scss'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Dropdown} from 'react-bootstrap'
import ledamoter from '../../utils/ledamoter.json'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';



const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
      background: 'white',
      padding:'0 0 1.8em 0'
    },
    formControl: {
        margin: theme.spacing.unit,
        width: '100%',

      },
    formControlGroup:{
        margin: theme.spacing.unit,
        width: '25%',
    },
    formContainer:{
        display:'flex',
        flexDirection: 'row',
        width: '30%'
    },
    select:{
        marginBottom: '16px'
    },
    menuItem:{
        fontSize:'1.2em'
        
    },
    shrink:{
        display:'none'
    },
    input: {
        marginLeft: 8,
        flex: 1,
        fontSize:'1.4em'

    },
    iconButton: {
        padding: 10,
        fontSize:'1.4em'
      },
    textField: {
        width:'75%'
    },
   
      notchedOutline: {},
      bootstrapRoot: {
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
      },
      chip: {
        margin: theme.spacing.unit / 2,
        cursor:'pointer'
      },
  });

class Riksdagsfilter extends Component {
    constructor(){
        super();
        this.state = {
            parti:'',
            lan:'',
            name:'',
            search: '',
            dropDown: '',
            groupby:'default',
            selectedSeat: ""
        }
    }

    updateSearch = (event) => {
        this.setState({search:event.target.value})
    }

    updateDropDown = (event) => {
        this.setState({dropDown:event.target.value}, () => {
            this.props.changeGroupBy(this.state.dropDown)
        })
        
    }
    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        }, () => {
           if(event.target.name == "groupby"){
               this.props.changeGroupBy(event.target.value)
           }
           else if(event.target.name=="parti"){
               this.props.changeParti(event.target.value)
           }
        })
    }

    handleChipClick = (seat) => {
        console.log(seat, this.props.selectedLedamotFromSeats)
        let filteredData = ledamoter.filter(
            seatData => {
                if(this.props.parti != "None")
                    return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && seatData.party.toLowerCase().indexOf(this.props.parti.toLowerCase()) !== -1;
                else
                    return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        );
        if(seat.selected){
            seat.selected =false 
            this.props.onSelectedLedamotChange("")
        }
        
        else{
            filteredData.map((data) => data.selected = false)
            seat.selected = true;
            this.props.onSelectedLedamotChange(seat)
        }
        
        
        
    }


    componentDidUpdate(prevProps, prevState){
        if(prevState != this.state){
            let filteredData = ledamoter.filter(
                seatData => {
                    if(this.props.parti != "None")
                        return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && seatData.party.toLowerCase().indexOf(this.props.parti.toLowerCase()) !== -1;
                    else
                        return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                }
            );
            if(filteredData.length == ledamoter.length){
                filteredData = []
            }
            this.props.onSearchChange(filteredData)      
        }
        else if(prevProps.parti != this.props.parti){
            if(this.props.parti != "None"){
                let filteredData = ledamoter.filter(
                    seatData => {
                            return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && seatData.party.toLowerCase() === this.props.parti.toLowerCase();
                    }
                );
                this.props.onSearchChange(filteredData)      

            }
            
        }
        else if(prevProps.selectedLedamotFromSeats.id != this.props.selectedLedamotFromSeats.id){
            let seat = _.find(ledamoter, {id: "#" +this.props.selectedLedamotFromSeats.id})
            if(seat){
                seat.selected = true;
                this.setState({search:this.props.selectedLedamotFromSeats.fname + " " +this.props.selectedLedamotFromSeats.ename })
            }
            else{
                ledamoter.map((data) => data.selected = false)
                this.props.onSelectedLedamotChange("")
                this.setState({search:""})

            }
        
        }
       
        
        
    }
    getLedamotImage = (name) => {
        let fname = name.split(" ")[0];
        let ename = name.split(" ")[1];
        let person = _.find(this.props.ledamoter.list.person, (ledamot) => {
            if(ledamot.tilltalsnamn == fname){
                if(ledamot.efternamn.split(" ").includes(ename)){
                    return ledamot
                }
            }
        })
        if(person){
            let url = person.bild_url_80
            return url
        }
        return "/placeholder.png"
    }
    getChipColor = (seat) => {
        // let filteredData = ledamoter.filter(
        //     seatData => {
        //         if(this.props.parti != "None")
        //             return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && seatData.party.toLowerCase().indexOf(this.props.parti.toLowerCase()) !== -1;
        //         else
        //             return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        //     }
        // );

        // let a = _.find(filteredData, {id: this.state.selectedId})
        // return seat.id == a.id ? "primary" : "secondary"
        return "primary"
    }

    render(){
        let filteredData = ledamoter.filter(
            seatData => {
                if(this.props.parti != "None")
                    return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && seatData.party.toLowerCase().indexOf(this.props.parti.toLowerCase()) !== -1;
                else
                    return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        );
        

        const { classes } = this.props
        return (
            <div className="search-container" >
                <form className={classes.root} autoComplete="off">
                    <div className="search_bar_container">
                    <IconButton className={classes.iconButton} aria-label="Search">
                        <SearchIcon fontSize="large" />
                    </IconButton>
                    <InputBase className={classes.input} placeholder="Sök efter en riksdagsledamot" value={this.state.search} onChange={this.updateSearch} />
                    
                    
                    <div className={classes.formContainer}>

                    <FormControl className={classes.formControl} >
                        <InputLabel htmlFor="age-simple" className={classes.menuItem}>Filtrera på ett parti</InputLabel>
                        <Select
                        className={classes.select}
                        disableUnderline={true}
                        value={this.state.parti}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'parti',
                            id: 'parti-simple',
                        }}
                        >
                        <MenuItem value="None" >
                             {this.state.parti === "None" ? "Filtrera på ett parti" : "Inga partier valda" } 
                        </MenuItem>
                        <MenuItem value={'M'}><img className="partyimage"src="/partyLogos/m.png"></img>Moderata samlingspartiet</MenuItem>
                        <MenuItem value={'C'}><img className="partyimage"src="/partyLogos/c.png"></img>Centerpartiet</MenuItem>
                        <MenuItem value={'SD'}><img className="partyimage"src="/partyLogos/sd.png"></img>Sverigedemokraterna</MenuItem>
                        <MenuItem value={'KD'}><img className="partyimage"src="/partyLogos/kd.jpg"></img>Kristdemokraterna</MenuItem>
                        <MenuItem value={'S'}><img className="partyimage"src="/partyLogos/s.png"></img>Socialdemokraterna</MenuItem>
                        <MenuItem value={'L'}><img className="partyimage"src="/partyLogos/l.png"></img>Liberalerna</MenuItem>
                        <MenuItem value={'MP'}><img className="partyimage"src="/partyLogos/mp.png"></img>Miljöpartiet</MenuItem>
                        <MenuItem value={'V'}><img className="partyimage"src="/partyLogos/v.png"></img>Vänsterpartiet</MenuItem>

                        </Select>
                    </FormControl>
                    
                    </div>
                    </div>

                    {/* Show parti members */}

                     <div className="search-seat-list"> 
                        {filteredData.map((seat, i)=>{ return(
                            <Chip key={i} 
                            label={seat.name}
                            color={seat.selected ? "primary": "default"}
                            className={classes.chip}
                            onClick={() => this.handleChipClick(seat)}
                            avatar={<Avatar alt="avt" src={this.getLedamotImage(seat.name)} />}
                            />
                            // <div key={i}> {seat.name}, {seat.party} </div>
                        )
                        })}
                    </div>
                    
                    </form>
            </div>
        )
    }  
}
export default withStyles(styles)(Riksdagsfilter);
