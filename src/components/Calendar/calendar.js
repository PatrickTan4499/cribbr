import React, { Component } from 'react';
import CalendarSelector from './calendarSelector';
import './calendar.css';
import CalendarEventAdder from './calendarEventAdder';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

class Calendar extends Component {
  constructor(props)
  {
    super(props);
    this.handleDoneLoading = this.handleDoneLoading.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.reload = this.reload.bind(this);
    this.state = {
      selectedDate: moment().format('x'),
      loading: true,
    };
  }
  
  handleDoneLoading()
  {
    if(this.state.loading)
    {
      this.setState({
        loading: false,
      });

      document.getElementById("loading-spinner").style.display = 'none';
      document.getElementById("calendar-selector").style.display = 'flex';
    }
  }

  handleLoading()
  {
    if(!this.state.loading)
    {
      this.setState({
        loading: true,
      });

      document.getElementById("loading-spinner").style.display = 'flex';
      document.getElementById("calendar-selector").style.display = 'none';
    }
  }

  reload()
  {
    this.setState({
      loading: true,
    })
  }

  render()
  {
    return (
      <Container className="pageContainer">
        <Grid container
          id="loading-spinner"
          alignItems="center"
          direction="column"
          justify="center"
          style={{ marginTop: 50 }}
          >
          <Grid item xs={3}>
            <CircularProgress />
          </Grid>
        </Grid>
        <Grid container
          id="calendar-selector" 
          spacing={3}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <CalendarSelector 
              onDoneLoading={this.handleDoneLoading} 
              parentLoading={this.state.loading} 
              onLoading={this.handleLoading}
              handleEditEvent={this.handleEditEvent}
              reload={this.reload}
              selectedDate={this.state.selectedDate}
              />
          </Grid>
          <Grid item xs={2}>
            <CalendarEventAdder
              selectedDate={this.state.selectedDate}
              reload={this.reload}
              />
          </Grid>
          
        </Grid>
      </Container>
    );
  }
}

export default Calendar;