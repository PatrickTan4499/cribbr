import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
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
  
  function JoinGroup () 
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
        <Button
            onClick={(e) => handleOpen()}
            variant="contained"
            color="primary"
          >
            Join A group
        </Button>

        <Modal open={open} onClose={handleClose}>
            <div style={modalStyle} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
                Enter Group Name
            </Typography>

        <TextField

            margin="normal"
            required
            fullWidth
            id="group"
            label="Group Name"

            autoComplete="email"
            autoFocus
            name="group"
          //  value={group}
           // onChange={this.onChange}
            type="text"
        />
        <Button
            variant="outlined"
            color="primary"
            align="right"
          >
            Join
        </Button>
            </div>
        </Modal>
      </div>
    );
  }

  export default JoinGroup;