import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './calendarEvent.css'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import { app } from '../Firebase/firebase';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

class CalendarEvent extends Component 
{
  constructor(props)
  {
    super(props);   
  
    this.eventsRef = app.firestore().collection('events');
    
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.state = {
      open: false,
      choreName: '',
      timestamp: this.props.selectedDate.format('x'),
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  addEvent = () => {
    this.eventsRef.add({
      choreName: this.state.choreName,
      timestamp: this.state.timestamp,
    });
    this.handleClose();
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
      <div className="button-container">
        <Fab color="primary" aria-label="Add">
          <AddIcon onClick={(e) => this.handleOpen(e)}/>
        </Fab>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <Paper className="paper">
            <Grid container>
                <Grid item>
                    <Typography variant="h6" id="modal-title">
                        Add Chore
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Typography>Chore Name</Typography>
                    <TextField 
                      required label="Required"
                      onChange={this.handleNameInput}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <FormControl component="fieldset">
                        <Typography>Repeats</Typography>
                        <RadioGroup>
                            <FormControlLabel value="daily" control={<Radio color="primary"/>} label="Daily" />
                            <FormControlLabel value="weekly" control={<Radio color="primary"/>} label="Weekly" />
                            <FormControlLabel value="monthly" control={<Radio color="primary"/>} label="Monthly" />
                            <FormControlLabel value="none" control={<Radio color="primary"/>} label="None" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
              </Grid> 
              <Grid container>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={(e) => this.addEvent()} size="small">
                      Submit
                  </Button> 
                </Grid>
              </Grid> 
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default CalendarEvent;