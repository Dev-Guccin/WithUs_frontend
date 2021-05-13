import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  // const [value, setValue] = React.useState('female');
  const [User_id, setUser_id] = useState("");
  const [User_password, setUser_password] = useState("");
  const [User_name, setUser_name] = useState("");
  const [User_gender, setUser_gender] = useState("Female");
  const [User_phone, setUser_phone] = useState("");
  const [User_university, setUser_university] = useState("");
  const [User_nickname, setUser_nickname] = useState("");
  const [User_area, setUser_area] = useState("");
  const [User_major, setUser_major] = useState("");
  const [User_certificate, setUser_certificate] = useState("");
  const [User_introduction, setUser_introduction] = useState("");

  // const handleChange = (event) => {setValue(event.target.value);};

  const onIdHandler = (event) => {setUser_id(event.currentTarget.value);}
  const onPasswordHandler = (event) => {setUser_password(event.currentTarget.value);}
  const onNameHandler = (event) => {setUser_name(event.currentTarget.value);}
  const onGenderHandler = (event) => {setUser_gender(event.currentTarget.value);}
  const onPhoneHandler = (event) => {setUser_phone(event.currentTarget.value);}
  const onUniversityHandler = (event) => {setUser_university(event.currentTarget.value);}
  const onNicknameHandler = (event) => {setUser_nickname(event.currentTarget.value);}
  const onAreaHandler = (event) => {setUser_area(event.currentTarget.value);}
  const onMajorHandler = (event) => {setUser_major(event.currentTarget.value);}
  const onCertificateHandler = (event) => {setUser_certificate(event.currentTarget.value);}
  const onIntroductionHandler = (event) => {setUser_introduction(event.currentTarget.value);}
  
  const onSubmitHandler = (event) => {
    event.preventDefault();

    var body = {
      User_id : User_id,
      User_password : User_password,
      User_name : User_name,
      User_gender : User_gender,
      User_phone : User_phone,
      User_university : User_university,
      User_nickname : User_nickname,
      User_area : User_area,
      User_major : User_major,
      User_certificate : User_certificate,
      User_introduction : User_introduction
    }

    axios.post('http://localhost:3001/users/join', body)
    .then(response => {
      if(response.data.SignUp) {
        alert("로그인 페이지로 이동합니다..");
        props.history.push('/Login');
      } else {
        alert("Signup Error " + response.data.message);
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="User_id"
                name="User_id"
                variant="outlined"
                required
                fullWidth
                id="User_id"
                label="User_id"
                autoFocus
                value = {User_id}
                onChange = {onIdHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="User_name"
                label="User_name"
                name="User_name"
                autoComplete="User_name"
                value = {User_name}
                onChange = {onNameHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <RadioGroup 
                  aria-label="User_gender" 
                  name="User_gender"
                  value={User_gender}
                  onChange={onGenderHandler}
                  row
                >
                    {["Female", "male"].map((value) => (
                      <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="User_phone"
                label="User_phone"
                name="User_phone"
                autoComplete="User_phone"
                value = {User_phone}
                onChange = {onPhoneHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="User_university"
                label="User_university"
                name="User_university"
                autoComplete="User_university"
                value = {User_university}
                onChange = {onUniversityHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="User_nickname"
                label="User_nickname"
                name="User_nickname"
                autoComplete="User_nickname"
                value = {User_nickname}
                onChange = {onNicknameHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="User_major"
                label="User_major"
                name="User_major"
                autoComplete="User_major"
                value = {User_major}
                onChange = {onMajorHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="User_area"
                label="User_area"
                name="User_area"
                autoComplete="User_area"
                value = {User_area}
                onChange = {onAreaHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="User_password"
                label="User_password"
                id="User_password"
                type="password"
                autoComplete="current-password"
                value = {User_password}
                onChange = {onPasswordHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="User_certificate"
                label="User_certificate"
                id="User_certificate"
                autoComplete="User_certificate"
                value = {User_certificate}
                onChange = {onCertificateHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="User_introduction"
                label="User_introduction"
                id="User_introduction"
                autoComplete="User_introduction"
                multiline
                value = {User_introduction}
                onChange = {onIntroductionHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}