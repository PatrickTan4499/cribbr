import React, { Component } from "react";
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import CalendarEventModal from './calendarEventModal';

class CalendarEventChip extends Component
{
    constructor(props)
    {
        super(props);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.state = {
            modalOpen: false,
            selectedDate: this.props.selectedDate.getTime(),
        }
    }

    static getDerivedStateFromProps(newProps)
    {
        return {
            selectedDate: newProps.selectedDate.getTime(),
        }
    }

    handleModalOpen()
    {
        this.setState({
            modalOpen: true
        })
    }

    handleModalClose()
    {
        this.setState({
            modalOpen: false
        })
    }

    render()
    {
        return(
            <Grid item xs={12}>
                <Chip
                    className="chip"
                    key={this.props.index}
                    label={this.props.event.name}
                    color="primary"
                    size="small"
                    style={{ width: '100%', overflow: 'hidden' }}
                    onClick={this.handleModalOpen}
                />
                <CalendarEventModal 
                    modalOpen={this.state.modalOpen}
                    selectedDate={this.state.selectedDate}
                    handleClose={this.handleModalClose}
                    reload={this.props.reload}
                    defaultValue={this.props.event.name}
                />
            </Grid>
        );
    }
}

export default CalendarEventChip;