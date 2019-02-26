/* eslint-disabled */
import React, { Component } from 'react'
import seatData from '../../utils'

import './Riksdagsfilter.scss'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import Paper from '@material-ui/core/Paper';
import ledamoter from '../../utils/ledamoter.json'


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
        width: '100%',
    },
    formContainer:{
        display:'flex',
        flexDirection: 'row',
        width: '100%'
    },
    input: {
        margin: theme.spacing.unit,
        width:'100%'
    },
    textField: {
        width:'100%'
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
            groupby:'default'
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
            <Paper className="search-container" elevation={1}>
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
                        label="Sök efter riksdagsledmot"
                        variant="outlined"
                        id="custom-css-outlined-input"
                    />


                    {/* Show parti members */}

                     <div className="search-seat-list"> 
                        {filteredData.map((seat, i)=>{ return(
                            <div key={i}> {seat.name}, {seat.party} </div>
                        )
                        })}
                    </div>
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
                            <em>Inget</em>
                        </MenuItem>
                        <MenuItem value={'M'}>Moderata samlingspartiet</MenuItem>
                        <MenuItem value={'C'}>Centerpartiet</MenuItem>
                        <MenuItem value={'SD'}>Sverigedemokraterna</MenuItem>
                        <MenuItem value={'KD'}>Kristdemokraterna</MenuItem>
                        <MenuItem value={'S'}>Socialdemokraterna</MenuItem>
                        <MenuItem value={'L'}>Liberalerna</MenuItem>
                        <MenuItem value={'MP'}>Miljöpartiet</MenuItem>
                        <MenuItem value={'V'}>Vänsterpartiet</MenuItem>

                        </Select>
                    </FormControl>
                    
                    </div>
                    <FormControl className={classes.formControlGroup} >
                        <InputLabel htmlFor="lan-simple">Gruppera efter</InputLabel>
                        <Select
                        value={this.state.groupby}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'groupby',
                            id: 'groupby-simple',
                        }}
                        >
                        <MenuItem value="default">
                            <em>Kammarplacering</em>
                        </MenuItem>
                        <MenuItem value={'partiet'}>Parti</MenuItem>
                        </Select>
                    </FormControl>
                    </form>
            </Paper>
        )
    }  
}
export default withStyles(styles)(Riksdagsfilter);
