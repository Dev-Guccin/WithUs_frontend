import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  axios.defaults.withCredentials = true;

  const header = {
    "Content-Type": "application/json"
  }
  useEffect(() => {
    console.log("check is changed to :", props.logincheck)
  }, [props.logincheck])
  
  function logout() {
    axios.get('http://localhost:3001/passport/logout', { header })
      .then(response => {
        alert('logout success');
        var LoginState = response.data.LoginState;
        localStorage.setItem('login_check', JSON.stringify(LoginState));
        localStorage.removeItem('user');
        console.log("login : ", LoginState)
        props.setlogincheck(JSON.stringify(LoginState))
      })
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {props.logincheck === undefined || JSON.parse(props.logincheck) === false ? <div></div> :<div>
          <Button variant="outlined" size="small">
              <Link to='/OnlyMyPage'>
                OnlyMyPage
          </Link>
            </Button></div>}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {props.logincheck === undefined || JSON.parse(props.logincheck) === false ? <div>
          <Button variant="outlined" size="small">
            <Link to='/SignUp'>
              SignUp
            </Link>
          </Button>
          <Button variant="outlined" size="small">
            <Link to='/Login' >
              Sign in
          </Link>
          </Button>
          </div>
          : <div>
            <Button variant="outlined" size="small">
              <Link to='/MyPage'>
                UserMyPage
          </Link>
            </Button>
            
            <Button variant="outlined" size="small" onClick={() => logout()}>
              Log out
          </Button>
          </div>}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            key={section.title}
            variant="body2"
            to={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};