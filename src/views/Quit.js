import React, {useState, Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  axios.defaults.withCredentials = true;

  const header = {
      "Content-Type": "application/json"
  }
  const classes = useStyles();

  const [User_password, setUser_password] = useState("");

  const onPasswordHandler = (event) => {

    setUser_password(event.currentTarget.value);
  }

  function logout() {
    axios.get('http://'+localStorage.getItem("backend")+':3001/passport/logout', { header })
      .then(response => {
        localStorage.clear();
        document.location.href = "/";
      })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    var body = {
        User_code : JSON.parse(localStorage.getItem('user')).User_code,
        User_password : User_password
    }

    axios.post('http://'+localStorage.getItem("backend")+':3001/users/Quit', body, {header})
    .then(response => {
      console.log("response : ",response)
      if(response.data.quit) {
        alert("탈퇴되었습니다.");
        logout();
      } else{
        alert(response.data.message);
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Quit
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="User_password"
            label="User_password"
            type="password"
            id="User_password"
            autoComplete="current-password"
            value = {User_password}
            onChange = {onPasswordHandler}
          />
        <FormLabel component="legend">비밀번호를 입력해주십시오</FormLabel>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원 탈퇴
          </Button>
        </form>
        
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}