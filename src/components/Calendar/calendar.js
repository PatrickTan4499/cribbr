import React, { Component } from 'react';
import Navbar from '../Navbar/navbar';
import CalendarSelector from './calendarSelector';
import './calendar.css';
import CalendarEvent from './calendarEvent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

class Calendar extends Component {
  constructor(props)
  {
    super(props);
    this.handleSelectedDate = this.handleSelectedDate.bind(this);
    this.state = {
      selectedDate: moment(),
    };
  }

  componentWillMount()
  {
    //onsole.log(this.state.selectedDate.format());
  }

  handleSelectedDate(selectedContext)
  {
    this.setState({
      selectedDate: selectedContext,
    });
  }

  render()
  {
    return (
      <Container className="pageContainer">
        <Navbar />
        <Grid container spacing={3}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <CalendarSelector onDayClick={this.handleSelectedDate}/>
          </Grid>
          <Grid item xs={2}>
            <CalendarEvent selectedDate={this.state.selectedDate}/>
          </Grid>
          
        </Grid>
      </Container>
    );
  }
}

export default Calendar;