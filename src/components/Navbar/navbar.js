import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import GroceriesIcon from '@material-ui/icons/ShoppingCart';
import MoneyIcon from '@material-ui/icons/Money';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import SignOutButton from '../SignOut/signOut';
import { AuthUserContext } from '../Session';
import './navbar.css';
import SignOut from '../SignOut/signOut';
import SignIn from '../SignIn/signIn';
import app from 'firebase/app';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <PersistentDrawerLeftNonAuth /> : <PersistentDrawerLeft />
      }
    </AuthUserContext.Consumer>
  </div>
);

function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function icon(index)
  {
    if(index === 0)
      return <HomeIcon />
    else if(index === 1)
      return <MailIcon />
    else if(index === 2)
      return <CalendarIcon />
    else if(index === 3)
      return <GroceriesIcon />
    else if(index === 4)
      return <MoneyIcon />

  }

  function handleClick(text)
  {
    if(text === "Home")
      return ROUTES.HOME;
    else if(text === "Message Board")
      return ROUTES.MESSAGES;
    else if(text === "Calendar")
      return ROUTES.CALENDAR;
    else if(text === "Groceries")
      return ROUTES.GROCERIES;
    else if(text === "Payments")
      return ROUTES.PAYMENTS;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" align="center" noWrap>
            Cribbr
          </Typography>
          <Typography style={{flex: 1}}></Typography>
    <Button component={Link} to={ROUTES.SIGN_IN} color="inherit"  className={useStyles.button} >
        Login
    </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Message Board', 'Calendar', 'Groceries', 'Payments'].map((text, index) => (
            <Link id="link" to={handleClick(text)}>
              <ListItem button key={text}>
                  <ListItemIcon>{icon(index)}</ListItemIcon>
                  <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/*<div className={classes.drawerHeader} />*/}
      </main>
    </div>
  );
}

function PersistentDrawerLeftNonAuth() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function icon(index)
  {
    if(index === 0)
      return <HomeIcon />
    else if(index === 1)
      return <MailIcon />
    else if(index === 2)
      return <CalendarIcon />
    else if(index === 3)
      return <GroceriesIcon />
    else if(index === 4)
      return <MoneyIcon />

  }

  function handleClick(text)
  {
    if(text === "Home")
      return ROUTES.HOME;
    else if(text === "Message Board")
      return ROUTES.MESSAGES;
    else if(text === "Calendar")
      return ROUTES.CALENDAR;
    else if(text === "Groceries")
      return ROUTES.GROCERIES;
    else if(text === "Payments")
      return ROUTES.PAYMENTS;
  }

  function AuthButton()
  {
    var loggedIn = false;
    app.auth().onAuthStateChanged(function(user)
    {
      if(user)
        loggedIn = true;
    });

    if(loggedIn)
      return(<SignOut />);
    return(<div />);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="headingContainer" variant="h6" align="center" noWrap>
            Cribbr
          </Typography>
          <Typography style={{flex: 1}}></Typography>
          <Button component={Link} to={ROUTES.SIGN_IN} color="inherit" className={useStyles.button}>
            <SignOutButton />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Message Board', 'Calendar', 'Groceries', 'Payments'].map((text, index) => (
            <Link id="link" to={handleClick(text)}>
              <ListItem button key={text}>
                  <ListItemIcon>{icon(index)}</ListItemIcon>
                  <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/*<div className={classes.drawerHeader} />*/}
      </main>
    </div>
  );
}
export default Navigation;