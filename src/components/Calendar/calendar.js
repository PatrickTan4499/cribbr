import React, { Component } from 'react';
import moment from 'moment';
import Navbar from '../Navbar/navbar';
import './calendar.css';
import { Typography } from '@material-ui/core';
import { thisExpression } from '@babel/types';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';

const style = 
{
  position: "relative",
  margin: "50px auto"
}

export default class Calendar extends Component {
  state = 
  {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
    dayClicked: 0
  }

  constructor(props)
  {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();

  year = () => {
    return this.state.dateContext.format("Y");
  }
  month = () => {
    return this.state.dateContext.format("MMMM");
  }
  currentDate = () => {
    return this.state.dateContext.get("date");
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }
  currentDay = () => {
    return this.state.dateContext.format("D");
  }

  populateYears = () => {
    let container = [];
    for(let i = parseInt(this.year()) - 5; i < parseInt(this.year()) + 5; i++)
    {
      container.push(i);
    }

    return container;
  }
  years = this.populateYears();

  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  setMonth = (month) => {
    let monthNumber = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNumber);
    this.setState({
      dateContext: dateContext,
      dayClicked: 0
    });
  }

  setYear = (year) => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("year", year);
    this.setState({
      dateContext: dateContext,
      dayClicked: 0
    });
  }

  onSelectChange = (e, data) => {
    if(this.months.includes(data))
    {
      this.setMonth(data);
      this.props.onMonthChange && this.props.onMonthChange();
    }
    else if(this.years.includes(data))
    {
      this.setYear(data);
      this.props.onYearChange && this.props.onYearChange();
    }
  }

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      let currentDate = (
        data == moment().year() ||
        data == moment().format("MMMM"))
        ? "current-day" : "unselectedListItem";
      return(
        <div className={currentDate} key={data}>
          <a href="#" onClick={(e) => {this.onSelectChange(e, data)}}>
            {data} 
          </a>
        </div>
      );
    });

    return(
      <div className="month-popup">
        {popup}
      </div>
    );
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    });
  } 

  MonthNav = () => {
    return(
      <span className="label-month" onClick={(e) => {this.onChangeMonth(e, this.month())}}>
        {this.month()}
        {this.state.showMonthPopup &&
          <this.SelectList data={this.months} />  
        }
      </span>
    );
  }

  onChangeYear = (e, year) => {
    this.setState({
      showYearPopup: !this.state.showYearPopup,
    });
  }

  YearNav = () => {
    return(
      <span className="label-year" onClick={(e) => {this.onChangeYear(e, this.year())}}>
        {this.year()}  
        {this.state.showYearPopup &&
          <this.SelectList data={this.years} />
        }
      </span>
    );
  }

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext,
      dayClicked: 0
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
  }

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext,
      dayClicked: 0
    });
    this.props.onNextMonth && this.props.onNextMonth();
  }

  onDayClick = (e, day) => {
    this.setState({
      dayClicked: day
    });
    this.props.onDayClick && this.props.onDayClick();
  }

  render()
  {
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    });

    let blanks = [];
    for(let i = 0; i < this.firstDayOfMonth(); i++)
    {
      blanks.push(
        <td key={i * 80} className="empty-slots">
          {""}
        </td>
      );
    }

    let daysInMonth = [];
    for(let d = 1; d <= this.daysInMonth(); d++)
    {
      let className;
      if(d == this.currentDay() && 
        this.months.indexOf(this.month()) == moment().month() &&
        this.year() == moment().year())
      {
        className = "day current-day";
      } 
      else if(d === this.state.dayClicked)
      {
        className = "day-clicked";
      }
      else
      {
        className = "day";
      }
      daysInMonth.push(
        <td key={d} className={className} onClick={(e) => {this.onDayClick(e, d)}}>
          <span>
            {d}
          </span>
        </td>
      );
    }

    let total = blanks.concat(daysInMonth);
    let rows = [];
    let curr = [];
    total.forEach((row, i) => {
      if(i % 7 === 0)
      {
        rows.push(curr);
        curr = [];
        curr.push(row);
      }
      else
      {
        curr.push(row);
      }

      if(i === total.length - 1)
      {
        rows.push(curr);
      }
    });

    let trElements = rows.map((d, i) => {
      return (
        <tr key={i * 100}>
          {d}
        </tr>
      );
    });

    return (
      <div>
        <Navbar />
        <h2 className="heading">Calendar</h2>
        <div className="calendar-container">
          <table className="calendar">
            <thead>
              <tr className="calendar-header">
                <td colSpan="1" className="nav-month">
                  <LeftIcon onClick={(e) => {this.prevMonth()}} />
                </td>
                <td colSpan="2">
                  <span><this.MonthNav /></span>
                </td>
                <td colSpan="1"></td>
                <td colSpan="2">
                  <span><this.YearNav /></span>
                </td>
                <td colSpan="1" className="nav-month">
                  <RightIcon onClick={(e) => {this.nextMonth()}} />
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekdays}
              </tr>
              {trElements}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
