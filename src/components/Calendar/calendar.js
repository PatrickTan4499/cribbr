import React, { Component } from 'react';
import Navbar from '../Navbar/navbar';
import CalendarSelector from './calendarSelector';
import './calendar.css';
import AddEventButton from './calendarEvent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Calendar = () => (
  <Container className="pageContainer">
    <Navbar />
    <Grid container spacing={3}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={8}>
        <CalendarSelector />
      </Grid>
      <Grid item xs={2}>
        <AddEventButton />
      </Grid>
      
    </Grid>
  </Container>
);

export default Calendar;