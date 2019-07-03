import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './calendarEvent.css'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: 'none',
    },
  }));
  
  function AddEventButton () 
  {
    const [open, setOpen] = React.useState(false);
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const classes = useStyles();
  
    return (
      <div className="buttonContainer">
        <Fab color="primary" aria-label="Add">
          <AddIcon onClick={(e) => handleOpen()}/>
        </Fab>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <Grid container className="formTable">
                <Grid item>
                    <Typography variant="h6" id="modal-title">
                        Add Chore
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className="formTable">
                <Grid item>
                    <Typography>Chore Name</Typography>
                    <TextField required label="Required"/>
                </Grid>
            </Grid>
            <Grid container className="formTable">
                <Grid item>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <Typography>Repeats</Typography>
                        <RadioGroup className={classes.group}>
                            <FormControlLabel value="daily" control={<Radio color="primary"/>} label="Daily" />
                            <FormControlLabel value="weekly" control={<Radio color="primary"/>} label="Weekly" />
                            <FormControlLabel value="monthly" control={<Radio color="primary"/>} label="Monthly" />
                            <FormControlLabel value="none" control={<Radio color="primary"/>} label="None" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
              </Grid>  
          </div>
        </Modal>
      </div>
    );
  }

  export default AddEventButton;