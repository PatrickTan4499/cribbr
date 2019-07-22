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

    var dates = [];
    //fill blanks
    const firstDayOfMonth = moment().date(1).day();
    for(var i = 0; i < firstDayOfMonth; i++)
    {
      dates.push({
        value: '',
      });
    }

    //fill the rest of the days
    const daysInMonth = moment().daysInMonth();
    for(var i = 0; i <= daysInMonth; i++)
    {
      dates.push({
        value: i,
      });
    }

    //split into rows of 7
    var rows = [];
    var currRow = [];
    for(var i = 0; i < dates.length; i++)
    {
      //add to row
      if(i % 7 || i == 0)
      {
        currRow.push(i);
      }
      //split
      else
      {
        rows.push(currRow);
        currRow = [];
        currRow.push(i);
      }
    }

    //process the month
    var month;
    switch(moment().month())
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
        month = "Juney";
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

    rows.push(currRow);
    console.log(rows);
    this.state = {
      rows: rows,
      daysInMonth: daysInMonth,
      month: month,
    }

    console.log(this.state.month);
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
                  <IconButton size="small">
                    <LeftIcon />
                  </IconButton>
                </TableCell>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h5">
                    {this.state.month}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton size="small">
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
