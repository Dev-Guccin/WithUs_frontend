import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from '../components/Header';

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
    root: {
        width: '100%',
        },
        heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        },
        secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        },
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
  const user = JSON.parse(localStorage.getItem('user'));
  axios.defaults.withCredentials = true;
  const [expanded, setExpanded] = React.useState(false);
  // const [value, setValue] = React.useState('female');
  const [User_name, setUser_name] = useState(user.User_name);
  const [User_phone, setUser_phone] = useState(user.User_phone);
  const [User_university, setUser_university] = useState(user.User_university);
  const [User_nickname, setUser_nickname] = useState(user.User_nickname);
  const [User_area, setUser_area] = useState(user.User_area);
  const [User_major, setUser_major] = useState(user.User_major);
  const [User_certificate, setUser_certificate] = useState(user.User_certificate);
  const [User_introduction, setUser_introduction] = useState(user.User_introduction);
  const header = {
    "Content-Type": "application/json"
  }
  // const handleChange = (event) => {setValue(event.target.value);};

  const onNameHandler = (event) => {setUser_name(event.currentTarget.value);}
  const onPhoneHandler = (event) => {setUser_phone(event.currentTarget.value);}
  const onUniversityHandler = (event) => {setUser_university(event.currentTarget.value);}
  const onNicknameHandler = (event) => {setUser_nickname(event.currentTarget.value);}
  const onAreaHandler = (event) => {setUser_area(event.currentTarget.value);}
  const onMajorHandler = (event) => {setUser_major(event.currentTarget.value);}
  const onCertificateHandler = (event) => {setUser_certificate(event.currentTarget.value);}
  const onIntroductionHandler = (event) => {setUser_introduction(event.currentTarget.value);}
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    var body = {
      User_code : user.User_code,
      User_name : User_name,
      User_phone : User_phone,
      User_university : User_university,
      User_nickname : User_nickname,
      User_area : User_area,
      User_major : User_major,
      User_certificate : User_certificate,
      User_introduction : User_introduction
    }

    axios.post('http://localhost:3001/users/modify', body, {header})
    .then(response => {

      if(response.data.modify) {
        alert(response.data.message);

        var modifyuser = {
          User_code : response.data.modifyuser.User_code,
          User_name : response.data.modifyuser.User_name,
          User_phone : response.data.modifyuser.User_phone,
          User_university : response.data.modifyuser.User_university,
          User_nickname : response.data.modifyuser.User_nickname,
          User_area : response.data.modifyuser.User_area,
          User_major : response.data.modifyuser.User_major,
          User_certificate : response.data.modifyuser.User_certificate,
          User_introduction : response.data.modifyuser.User_introduction
        }

        localStorage.setItem("user", JSON.stringify(modifyuser));

      } else {
        alert("modify Error " + response.data.message);
      }
    })
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          MyPage
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          {/* 마이페이지창 */}
                <div className={classes.root}>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        >
                        <Typography className={classes.heading}>이름</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_name
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_name"
                                // label="User_name"
                                name="User_name"
                                autoComplete="User_name"
                                placeholder="수정할 텍스트"
                                value = {User_name}
                                onChange = {onNameHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>대학교</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_university
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_university"
                                label="User_university"
                                name="User_university"
                                autoComplete="User_university"
                                placeholder="수정할 텍스트"
                                value = {User_university}
                                onChange = {onUniversityHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>닉네임</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_nickname
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_nickname"
                                label="User_nickname"
                                name="User_nickname"
                                autoComplete="User_nickname"
                                placeholder="수정할 텍스트"
                                value = {User_nickname}
                                onChange = {onNicknameHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>전화번호</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_phone
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_phone"
                                label="User_phone"
                                name="User_phone"
                                autoComplete="User_phone"
                                placeholder="수정할 텍스트"
                                value = {User_phone}
                                onChange = {onPhoneHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>전공</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_major
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_major"
                                label="User_major"
                                name="User_major"
                                autoComplete="User_major"
                                placeholder="수정할 텍스트"
                                value = {User_major}
                                onChange = {onMajorHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>사는지역</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_area
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_area"
                                label="User_area"
                                name="User_area"
                                autoComplete="User_area"
                                placeholder="수정할 텍스트"
                                value = {User_area}
                                onChange = {onAreaHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>자격증</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_certificate
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_certificate"
                                label="User_certificate"
                                name="User_certificate"
                                autoComplete="User_certificate"
                                placeholder="수정할 텍스트"
                                value = {User_certificate}
                                onChange = {onCertificateHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>하고싶은말</Typography>
                        <Typography className={classes.secondaryHeading}>
                            User_introduction
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="User_introduction"
                                label="User_introduction"
                                name="User_introduction"
                                autoComplete="User_introduction"
                                multiline
                                placeholder="수정할 텍스트"
                                value = {User_introduction}
                                onChange = {onIntroductionHandler}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>
          {/* 마이페이지창 end */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            MODIFY
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