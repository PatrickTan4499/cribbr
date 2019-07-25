import React, { Component } from 'react';
import moment from 'moment';
import { TableHead, TableCell, Table, TableRow, TableBody, IconButton } from '@material-ui/core';
import { thisExpression } from '@babel/types';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import Chip from '@material-ui/core/Chip';
import { app } from '../Firebase/firebase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CalendarDay from './calendarDay';

export default class CalendarSelector extends Component 
{
  constructor(props)
  {
    super(props);
    this.eventsRef = app.firestore().collection('events');
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getMonthString = this.getMonthString.bind(this);
    this.getRows = this.getRows.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    const curr = moment();
    const rows = this.getRows(curr);
    
    this.state = {
      rows: rows,
      daysInMonth: curr.daysInMonth(),
      month: moment().month(),
      year: moment().year(),
      today: moment().date(),
      selectedDay: '',
    }
  }

  getRows(currMoment)
  {
    var dates = [];
    //fill blanks
    const firstDayOfMonth = currMoment.date(1).day();
    for(var i = 0; i < firstDayOfMonth; i++)
    {
      dates.push('');
    }

    //fill the rest of the days
    const daysInMonth = currMoment.daysInMonth();
    for(var i = 1; i <= daysInMonth; i++)
    {
      dates.push(i);
    }

    //split into rows of 7
    var rows = [];
    var currRow = [];
    for(var i = 0; i < dates.length; i++)
    {
      //add to row
      if(i % 7 || i == 0)
      {
        currRow.push(dates[i]);
      }
      //split
      else
      {
        rows.push(currRow);
        currRow = [];
        currRow.push(dates[i]);
      }
    }

    currRow.push('');
    rows.push(currRow);
    return rows;
  }

  getMonthString(monthNum)
  {
    var month;
    switch(monthNum)
    {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }

    return month;
  }

  handleNext(e)
  {
    var newYear;
    var newMonth;
    var currMoment;
    var today;
    if(this.state.month == 11)
    {
      newYear = this.state.year + 1;
      newMonth = 0;
      const temp = newYear + "-" + (newMonth + 1) + "-1";
      currMoment = moment(temp, "YYYY-MM-DD");
      if(moment().year() == newYear && moment().month() == newMonth)
        today = moment().date();
      else 
        today = '';
    }
    else
    {
      newYear = this.state.year;
      newMonth = this.state.month + 1;
      const temp = this.state.year + "-" + (this.state.month + 2) + "-1";
      currMoment = moment(temp, "YYYY-MM-DD");
      if(moment().year() == newYear && moment().month() == newMonth)
        today = moment().date();
      else 
        today = '';
    }

    this.setState({
      month: newMonth,
      year: newYear,
      rows: this.getRows(currMoment),
      today: today,
      selectedDay: '',
    });
  }

  handlePrev()
  {
    var newYear;
    var newMonth;
    var currMoment;
    var today;
    if(this.state.month == 0)
    {
      newYear = this.state.year - 1;
      newMonth = 11;
      const temp = newYear + "-" + (newMonth + 1) + "-1";
      currMoment = moment(temp, "YYYY-MM-DD");
      if(moment().year() == newYear && moment().month() == newMonth)
        today = moment().date();
      else 
        today = '';
    }
    else
    {
      newYear = this.state.year;
      newMonth = this.state.month - 1;
      const temp = newYear + "-" + (newMonth + 1) + "-1";
      currMoment = moment(temp, "YYYY-MM-DD");
      if(moment().year() == newYear && moment().month() == newMonth)
        today = moment().date();
      else 
        today = '';
    }

    this.setState({
      month: newMonth,
      year: newYear,
      rows: this.getRows(currMoment),
      today: today,
      selectedDay: '',
    });
  }

  handleSelect(day)
  {
    this.setState({
      selectedDay: day,
    });
  }

  render()
  {
    return (
      <div>
        <Typography variant="h4">
          Calendar
        </Typography>
        <Paper>
          <Table>
            <colgroup>
              <col style={{width:'14%'}}/>
              <col style={{width:'14%'}}/>
              <col style={{width:'14%'}}/>
              <col style={{width:'14%'}}/>
              <col style={{width:'14%'}}/>
              <col style={{width:'14%'}}/>
              <col style={{width:'14%'}}/>
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>
                  <IconButton size="small" onClick={(e) => this.handlePrev()}>
                    <LeftIcon />
                  </IconButton>
                </TableCell>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h5">
                    {this.getMonthString(this.state.month)} {this.state.year}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={(e) => this.handleNext()}>
                    <RightIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sun</TableCell>
                <TableCell>Mon</TableCell>
                <TableCell>Tue</TableCell>
                <TableCell>Wed</TableCell>
                <TableCell>Thu</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell>Sat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.rows.map((row, i) => (
                  <TableRow key={i}>
                    {
                      row.map((day, i) => {
                        let currentDate = {
                          month: this.state.month,
                          day: day,
                          year: this.state.year,
                        };

                        if(day == 0 || day > this.state.daysInMonth)
                        {
                          return <TableCell key={i} align="left"></TableCell>
                        }
                        else if(day == this.state.today)
                        {
                          return (
                            <CalendarDay key={i} date={currentDate} today={true} selected={false} handleSelect={this.handleSelect} />
                          )
                        }
                        else if(day == this.state.selectedDay)
                        {
                          return (
                            <CalendarDay key={i} date={currentDate} today={false} selected={true} handleSelect={this.handleSelect} />
                          )
                        }
                        else
                        {
                          return (
                            <CalendarDay key={i} date={currentDate} today={false} selected={false} handleSelect={this.handleSelect} />
                          )
                        }
                      })
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
