import React, { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  linkBtn:{
    textDecoration: 'none'
  }
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
    axios.get('http://'+localStorage.getItem("backend")+':3001/passport/logout', { header })
      .then(response => {
        alert('logout success');
        // var LoginState = response.data.LoginState;
        // localStorage.setItem('login_check', JSON.stringify(LoginState));
        // localStorage.removeItem('user');
        // console.log("login : ", LoginState);
        // props.setlogincheck(JSON.stringify(LoginState));
        localStorage.clear();
        console.log("clear", localStorage)
        var LoginState = response.data.LoginState;
        localStorage.setItem('login_check', JSON.stringify(LoginState));
        props.setlogincheck(JSON.stringify(LoginState));
        document.location.href = "/";
      })
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {props.logincheck === undefined || JSON.parse(props.logincheck) === false ? <div></div> :<div>
          <Link to='/OnlyMyPage' className={classes.linkBtn}>
            <Button variant="outlined" size="small">
              {JSON.parse(localStorage.getItem("user")).User_nickname}&nbsp;<AccountCircleIcon />
            </Button>
          </Link>
            </div>}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >            
          <Link to='/home' className={classes.linkBtn}>
            {title}
          </Link>
        </Typography>
        {props.logincheck === undefined || JSON.parse(props.logincheck) === false ? <div>
          <Button variant="outlined" size="small">
            <Link to='/SignUp' className={classes.linkBtn}>
              SignUp
            </Link>
          </Button>
          <Button variant="outlined" size="small">
            <Link to='/Login' className={classes.linkBtn}>
              Sign in
            </Link>
          </Button>
          </div>
          : <div>
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
            className={classes.toolbarLink, classes.linkBtn}
          >
            <h4>{section.title}</h4>
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