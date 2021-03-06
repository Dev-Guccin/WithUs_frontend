import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
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
  const [User_current_password, setUser_current_password] = useState("");

  const onPasswordHandler = (event) => {setUser_password(event.currentTarget.value);}
  const onCurrentPasswordHandler = (event) => {setUser_current_password(event.currentTarget.value);}

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
        User_current_password : User_current_password,
        User_password : User_password

    }

    axios.post('http://'+localStorage.getItem("backend")+':3001/users/modifyPassword', body, {header})
    .then(response => {
        console.log(response.data);
        if(response.data.modify) {
            alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요");
            logout();
        } else {
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
          비밀번호 변경
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
        <FormLabel component="legend">현재 비밀번호를 입력해주십시오</FormLabel>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="User_current_password"
            label="현재 비밀번호"
            type="password"
            id="User_current_password"
            autoComplete="current-password"
            value = {User_current_password}
            onChange = {onCurrentPasswordHandler}
          />
          <FormLabel component="legend">변경할 비밀번호를 입력해주십시오</FormLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="User_password"
            label="변경할 비밀번호"
            type="password"
            id="User_password"
            autoComplete="current-password"
            value = {User_password}
            onChange = {onPasswordHandler}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
              비밀번호 변경
          </Button>
        </form>
        
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}