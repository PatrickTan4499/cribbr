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
        this.compareArrays = this.compareArrays.bind(this);
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
        .then( events => {
            if(!this.compareArrays(events, this.state.events))
            {
                this.setState({
                    events: events,
                });
            }

        })
        .then(() => {
            if(this.props.parentLoading && this.props.isLastDay)
            {
                
                this.props.onDoneLoading();
            }
        });
    }

    compareArrays(arr1, arr2)
    {
        if(arr1.length !== arr2.length)
            return false;

        var i = 0;
        while(i != arr1.length)
        {
            if(typeof arr1[i] === 'object' && typeof arr2[i] === 'object')
            {
                var aProps = Object.getOwnPropertyNames(arr1[i]);
                var bProps = Object.getOwnPropertyNames(arr2[i]);
                if(aProps.length !== bProps.length)
                    return false;
            
                for(var j = 0; j < aProps.length; j++)
                {
                    var propName = aProps[i];
                    if(arr1[j][propName] !== arr2[j][propName])
                        return false;
                }
            }
            else if(arr1[i] !== arr2[i])
                return false;
            i++;
        }

        return true;
    }

    render()
    {
        var cellClass = "day-box";
        var typoClass = "";
        if(this.props.today)
        {
            cellClass += " today";
            typoClass = "day-number-text";
        }
        else if(this.props.selected)
        {
            cellClass += " selected-box";
        }

        return (
            <TableCell className={cellClass} align="left" onClick={(e) => this.props.handleSelect(this.props.date.day)}>
                <div className={typoClass} style={{ width: '100%' }}>
                    {this.props.date.day}

                    {this.state.events.map((event, index) => {
                        return (
                            <Chip
                                key={index}
                                label={event.name}
                                color="primary"
                                size="small"
                                style={{ width: '100%' }}
                            />
                        );
                    })}  
                </div>
         
            </TableCell>
        );
    }
}

export default CalendarDay;