/* eslint-disabled */
import React, { Component } from 'react'
import seatData from '../../utils'

import './Riksdagsfilter.scss'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import ledamoter from '../../utils/ledamoter.json'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
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
        width: '25%'
    },
    input: {
        margin: theme.spacing.unit,
        width:'75%'
    },
    textField: {
        width:'75%'
    },
    cssLabel: {
        '&$cssFocused': {
          color: purple[500],
        },
      },
      cssFocused: {},
      cssUnderline: {
        '&:after': {
          borderBottomColor: '',
        },
      },
      cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: purple[500],
        },
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
                            return seatData.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && seatData.party.toLowerCase().indexOf(this.props.parti.toLowerCase()) !== -1;
                    }
                );
                this.props.onSearchChange(filteredData)      

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
        return ""
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

                    <TextField
                        onChange={this.updateSearch}
                        className={classes.textField}
                        InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                        }}
                        InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                        }}
                        label="Search for riksdags members"
                        variant="outlined"
                        id="custom-css-outlined-input"
                    />
                    <div className={classes.formContainer}>
                    <FormControl className={classes.formControl} >
                        <InputLabel htmlFor="age-simple">Parti</InputLabel>
                        <Select
                        value={this.state.parti}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'parti',
                            id: 'parti-simple',
                        }}
                        >
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'M'}>Moderata samlingspartiet</MenuItem>
                        <MenuItem value={'C'}>Centerpartier</MenuItem>
                        <MenuItem value={'SD'}>Sverigedemokraterna</MenuItem>
                        <MenuItem value={'KD'}>Kristdemokraterna</MenuItem>
                        <MenuItem value={'S'}>Socialdemokraterna</MenuItem>
                        <MenuItem value={'L'}>Liberalerna</MenuItem>
                        <MenuItem value={'MP'}>Miljöpartiet</MenuItem>
                        <MenuItem value={'V'}>Vänsterpartiet</MenuItem>

                        </Select>
                    </FormControl>
                    
                    </div>
                    {/* <FormControl className={classes.formControlGroup} >
                        <InputLabel htmlFor="lan-simple">Group by</InputLabel>
                        <Select
                        value={this.state.groupby}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'groupby',
                            id: 'groupby-simple',
                        }}
                        >
                        <MenuItem value="default">
                            <em>By real life positions</em>
                        </MenuItem>
                        <MenuItem value={'partiet'}>By partier</MenuItem>
                        </Select>
                    </FormControl> */}

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
