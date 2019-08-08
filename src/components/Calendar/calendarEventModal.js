import React, { Component } from "react";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { app } from '../Firebase/firebase';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

class CalendarEventModal extends Component
{
    constructor(props)
    {
        super(props);
        this.eventsRef = app.firestore().collection('events');
        this.addEvent = this.addEvent.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        
        this.state = {
            choreName: '',
            timestamp: this.props.selectedDate * 1,
        };
    }
    
    static getDerivedStateFromProps(newProps)
    {
        return {
            timestamp: newProps.selectedDate * 1,
        }
    }

    addEvent = () => {
        if(/\S/.test(this.state.choreName))
        {
            this.eventsRef.add({
                choreName: this.state.choreName,
                timestamp: this.state.timestamp * 1,
            });
    
            this.props.handleClose();
            this.setState({
                choreName: '',
            });
            this.props.reload();
        }
    }
    
    handleNameInput(e)
    {
        this.setState({
            choreName: e.target.value,
        });
    }

    handleDateChange(date)
    {
        this.setState({
            timestamp: date,
        })
    }

    render()
    {
        return (
            <Modal open={this.props.modalOpen} onClose={this.props.handleClose} overflow="scroll">
                <Paper className="paper">
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" id="modal-title">
                                    Add Chore
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Chore Name</Typography>
                                <TextField 
                                    style={{ width: '100%' }}
                                    required label="Required"
                                    onChange={this.handleNameInput}
                                    defaultValue={this.props.defaultValue}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Repeats</Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup row>
                                        <FormControlLabel value="daily" control={<Radio color="primary"/>} label="Daily" />
                                        <FormControlLabel value="weekly" control={<Radio color="primary"/>} label="Weekly" />
                                        <FormControlLabel value="monthly" control={<Radio color="primary"/>} label="Monthly" />
                                        <FormControlLabel value="none" control={<Radio color="primary"/>} label="None" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Date</Typography>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="mui-pickers-date"
                                    value={new Date(this.state.timestamp)}
                                    onChange={date => this.handleDateChange(date)}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={(e) => this.addEvent()} size="small">
                                    Submit
                                </Button> 
                            </Grid>
                        </Grid> 
                    </MuiPickersUtilsProvider>
                </Paper>
            </Modal>
        )
    }
}

export default CalendarEventModal;