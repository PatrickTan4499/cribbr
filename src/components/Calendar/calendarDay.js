import React, { Component } from 'react';
import './calendarDay.css';
import { TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { app } from '../Firebase/firebase';
import moment from 'moment';

class CalendarDay extends Component
{
    constructor(props)
    {
        super(props);
        this.eventsRef = app.firestore().collection('events');
        this.updateDaysEvents = this.updateDaysEvents.bind(this);
        this.state = {
            events: [],
            day: this.props.date.day,
            month: this.props.date.month,
            year: this.props.date.year,
        }
    }

    static getDerivedStateFromProps(newProps)
    {
        return {
            day: newProps.date.day,
            month: newProps.date.month,
            year: newProps.date.year,
        }
    }

    componentDidMount()
    {
        this.updateDaysEvents();
    }

    componentDidUpdate()
    {
        this.updateDaysEvents();
    }

    updateDaysEvents()
    {
        this.eventsRef.get().then(snapshot => {
            let events = [];
            snapshot.forEach(event => {
                const eventMoment = moment(event.data().timestamp * 1);
                if(eventMoment.year() == this.state.year &&
                    eventMoment.month() == this.state.month &&
                    eventMoment.date() == this.state.day
                )
                events.push({
                    name: event.data().choreName,
                });
            });
            return events;
        })
        .then( events =>
            this.setState({
                events: events,
            })
        );
    }

    render()
    {
        var cellClass;
        var typoClass = "";
        if(this.props.today)
        {
            cellClass = "day-box today";
            typoClass = "day-number-text";
        }
        else if(this.props.selected)
        {
            cellClass = "day-box selected-box";
        }
        else
        { 
            cellClass = "day-box";
        }

        return (
            <TableCell className={cellClass} align="left" onClick={(e) => this.props.handleSelect(this.props.date.day)}>
                <Typography className={typoClass}>
                    {this.props.date.day}
                </Typography> 
                {this.state.events.map((event, index) => {
                    return (
                        <Chip
                            key={index}
                            label={event.name}
                        />
                    );
                })}           
            </TableCell>
        );
    }
}

export default CalendarDay;