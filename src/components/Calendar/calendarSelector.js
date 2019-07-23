import React, { Component } from 'react';
import moment from 'moment';
import './calendarSelector.css';
import { TableHead, TableCell, Table, TableRow, TableBody, IconButton } from '@material-ui/core';
import { thisExpression } from '@babel/types';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import Chip from '@material-ui/core/Chip';
import { app } from '../Firebase/firebase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

    const curr = moment();
    const rows = this.getRows(curr);
    
    this.state = {
      rows: rows,
      daysInMonth: curr.daysInMonth(),
      month: moment().month(),
      year: moment().year(),
    }

    console.log(this.state.year);
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
    if(this.state.month == 11)
    {
      const temp = this.state.year + 1 + "-1-1";
      const currMoment = moment(temp, "YYYY-MM-DD");
      this.setState({
        month: 0,
        year: this.state.year + 1,
        rows: this.getRows(currMoment)
      });
    }
    else
    {
      const temp = this.state.year + "-" + (this.state.month + 2) + "-1";
      const currMoment = moment(temp, "YYYY-MM-DD");
      this.setState({
        month: this.state.month + 1,
        rows: this.getRows(currMoment),
      });
    }
  }

  handlePrev()
  {
    if(this.state.month == 0)
    {
      const temp = this.state.year - 1 + "-12-1";
      const currMoment = moment(temp, "YYYY-MM-DD");
      this.setState({
        month: 11,
        year: this.state.year - 1,
        rows: this.getRows(currMoment),
      });
    }
    else
    {
      const temp = this.state.year + "-" + this.state.month + "-1";
      const currMoment = moment(temp, "YYYY-MM-DD");
      this.setState({
        month: this.state.month - 1,
        rows: this.getRows(currMoment),
      });
    }
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
                <TableCell>Sunday</TableCell>
                <TableCell>Monday</TableCell>
                <TableCell>Tuesday</TableCell>
                <TableCell>Wednesday</TableCell>
                <TableCell>Thursday</TableCell>
                <TableCell>Friday</TableCell>
                <TableCell>Saturday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.rows.map((row, i) => (
                  <TableRow key={i}>
                    {
                      row.map((day, i) => {
                        if(day == 0 || day > this.state.daysInMonth)
                        {
                          return <TableCell align="right"></TableCell>
                        }
                        else
                        {
                          return <TableCell align="right">{day}</TableCell>
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
