import React, { Component } from 'react';
import './calendarDay.css';
import { TableCell, createMuiTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { app } from '../Firebase/firebase';
import moment from 'moment';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandIcon from '@material-ui/icons/KeyboardArrowDown';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import CalendarEventChip from './calendarEventChip';

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                "&:last-child": {
                    paddingRight: 10,
                },
                padding: 10,
            },
        },
        MuiChip: {
            root:{
                position: 'relative',
                display: 'inline-grid',
                justifyContent: 'left'
            },
            label: {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                width: '100%',
                position: 'relative',
                display: 'block'
            }
        },
        MuiButton: {
            root: {
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0) !important",
                    backgroundImage: "linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,1))"
                }
            }
        }
    },
});

class CalendarDay extends Component
{
    constructor(props)
    {
        super(props);
        this.eventsRef = app.firestore().collection('events');
        this.updateDaysEvents = this.updateDaysEvents.bind(this);
        this.compareArrays = this.compareArrays.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            events: [],
            day: this.props.date.day,
            month: this.props.date.month,
            year: this.props.date.year,
            poppupOpen: false,
            poppupAnchor: null,
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

    handleExpand(e)
    {
        this.setState({
            poppupOpen: !this.state.poppupOpen,
            poppupAnchor: e.currentTarget
        })
    }

    handleClose()
    {
        this.setState({
            poppupOpen: false,
            poppupAnchor: null
        })
    }

    render()
    {
        //classes for calendar table cells
        var cellClass = "day-box";
        var typoClass = "day-box-inner";
        if(this.props.today)
        {
            cellClass += " today";
            typoClass += " day-number-text";
        }
        else if(this.props.selected)
        {
            cellClass += " selected-box";
        }

        //styles for the expand events button
        var expandButtonStyle = { 
            display: 'none',
        };
        if(this.state.events.length > 2)
        {
            expandButtonStyle = { 
                display: 'block',
            };
        }

        //set the selected date
        var selectedDate;


        return (
            <ThemeProvider theme={theme}>
                <TableCell className={cellClass} align="left" onClick={(e) => this.props.handleSelect(this.props.date.day)}>
                    <Grid container 
                        className={typoClass} 
                        style={{ width: '100%' }}
                        spacing={1}
                        >
                        <Grid item xs={12}>
                            {this.props.date.day}
                        </Grid>
                        {this.state.events.map((event, index) => {
                            return (
                                <CalendarEventChip 
                                    selectedDate={this.props.selectedDate}
                                    event={event}
                                    index={index}
                                    reload={this.props.reload}
                                />
                            );
                        })}  
                    </Grid>
                    <div style={expandButtonStyle}>
                        <Button 
                            size="small" 
                            onClick={this.handleExpand}
                            style={{ 
                                position: 'absolute', 
                                left: 0, 
                                right: 0, 
                                bottom: 0, 
                                maxHeight: 20, 
                                zIndex: 2, 
                                width: "100%",
                                borderRadius: 0,
                                backgroundImage: "linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,1))"
                                }}>
                            <ExpandIcon />
                        </Button>
                        <Popover
                            open={this.state.poppupOpen}
                            anchorEl={this.state.poppupAnchor}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            style={{  }}
                            >
                            <Paper
                                style={{ padding: 15, minWidth: 200, overflow: 'auto' }}>
                                <Grid container 
                                    className={typoClass} 
                                    spacing={1}
                                    >
                                    {this.state.events.map((event, index) => {
                                        return (
                                            <CalendarEventChip
                                                selectedDate={this.props.selectedDate}
                                                event={event}
                                                index={index}
                                                reload={this.props.reload}
                                            />
                                        );
                                    })}  
                                </Grid>
                            </Paper>
                        </Popover>
                    </div>
                </TableCell>
            </ThemeProvider>
        );
    }
}

export default CalendarDay;