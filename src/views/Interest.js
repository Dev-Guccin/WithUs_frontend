import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    const [state, setState] = React.useState({
        ScienceEnginnering: true,
        ContentsWebtoon: false,
        EnvironmentEnergy: false,
        Employment: false,
        Art: false,
        Academic : false,
        Idea : false,
        UCC : false,
        culture : false,
        Design : false,
        Slogan : false,
        Economy : false
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  
    const { ScienceEnginnering, ContentsWebtoon, EnvironmentEnergy, Employment, Art, Academic, Idea, UCC, culture, Design, Slogan, Economy} = state;
    // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Interest
        </Typography>
          {/* 관심사 추가 */}
          {/* <div className={classes.root}> */}
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Assign responsibility</FormLabel>
                <FormGroup>
                <Grid item direction="column">
                <FormControlLabel
                    control={<Checkbox checked={ScienceEnginnering} onChange={handleChange} name="ScienceEnginnering" />}
                    label="ScienceEnginnering"
                />
                <FormControlLabel
                    control={<Checkbox checked={ContentsWebtoon} onChange={handleChange} name="ContentsWebtoon" />}
                    label="ContentsWebtoon"
                />
                <FormControlLabel
                    control={<Checkbox checked={EnvironmentEnergy} onChange={handleChange} name="EnvironmentEnergy" />}
                    label="EnvironmentEnergy"
                />
                </Grid>
                <Grid item direction="column">
                <FormControlLabel
                    control={<Checkbox checked={Employment} onChange={handleChange} name="Employment"/>}
                    label="Employment"
                />
                <FormControlLabel
                    control={<Checkbox checked={Art} onChange={handleChange} name="Art" />}
                    label="Art"
                />
                <FormControlLabel
                    control={<Checkbox checked={Academic} onChange={handleChange} name="Academic" />}
                    label="Academic"
                />
                </Grid>
                <div>
                <FormControlLabel
                    control={<Checkbox checked={Idea} onChange={handleChange} name="Idea" />}
                    label="Idea"
                />
                <FormControlLabel
                    control={<Checkbox checked={UCC} onChange={handleChange} name="UCC" />}
                    label="UCC"
                />
                <FormControlLabel
                    control={<Checkbox checked={culture} onChange={handleChange} name="culture" />}
                    label="culture"
                />
                </div>
                <div>
                <FormControlLabel
                    control={<Checkbox checked={Design} onChange={handleChange} name="Design" />}
                    label="Design"
                />
                <FormControlLabel
                    control={<Checkbox checked={Slogan} onChange={handleChange} name="Slogan" />}
                    label="Slogan"
                />
                <FormControlLabel
                    control={<Checkbox checked={Economy} onChange={handleChange} name="Economy" />}
                    label="Economy"
                />
                </div>
                </FormGroup>
                <FormHelperText>최대 3개까지 골라주십시오</FormHelperText>
            </FormControl>
    {/* </div> */}
          {/* 관심사 추가 end */}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}