import React, { Component } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { app } from '../Firebase/firebase';
import { KeyboardDatePicker } from '@material-ui/pickers';

class CalendarEventModal extends Component
{
    constructor(props)
    {
        super(props);
        this.eventsRef = app.firestore().collection('events');
        this.addEvent = this.addEvent.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
    
        this.state = {
            choreName: '',
            timestamp: this.props.selectedDate.format('x'),
            error: false,
        };
    }

    addEvent = () => {
        if (!this.state.choreName.replace(/\s/g, '').length)
        {
            this.setState({
                error: true,
            })
        }
        else
        {
            this.eventsRef.add({
                choreName: this.state.choreName,
                timestamp: this.state.timestamp,
            });
            this.props.handleClose();
            this.props.reload();
            this.setState ({
                choreName: '',
                error: false,
            });
        }
    }
    
    handleNameInput(e)
    {
        this.setState({
            choreName: e.target.value,
        });
    }

    render()
    {
        return (
            <Modal open={this.props.modalOpen} onClose={this.props.handleClose} overflow="scroll">
                <Paper className="paper">
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
                                error={this.state.error}
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
                            <Button variant="contained" color="primary" onClick={(e) => this.addEvent()} size="small">
                                Submit
                            </Button> 
                        </Grid>
                        <Grid item xs={12}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="mui-pickers-date"
                                label="Date picker"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </Grid> 
                </Paper>
            </Modal>
        )
    }
}

export default CalendarEventModal;