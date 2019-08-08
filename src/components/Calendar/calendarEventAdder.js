import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './calendarEventAdder.css'
import { app } from '../Firebase/firebase';
import CalendarEventModal from './calendarEventModal';

class CalendarEvent extends Component 
{
  constructor(props)
  {
    super(props);   
  
    this.eventsRef = app.firestore().collection('events');
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      modalOpen: false,
      selectedDate: this.props.selectedDate,
    }
  }
  
  static getDerivedStateFromProps(newProps)
  {
    return {
      selectedDate: newProps.selectedDate,
    }
  }

  handleOpen()
  {
    this.setState({
      modalOpen: true,
    })
  }

  handleClose()
  {
    this.setState({
      modalOpen: false,
    })
  }

  render()
  {
    return (
      <div className="button-container">
        <Fab color="primary" aria-label="Add">
          <AddIcon onClick={(e) => this.handleOpen(e)}/>
        </Fab>
        <CalendarEventModal 
          modalOpen={this.state.modalOpen}
          selectedDate={this.state.selectedDate}
          handleClose={this.handleClose}
          reload={this.props.reload}
          defaultValue=""
        />
      </div>
    );
  }
}

export default CalendarEvent;