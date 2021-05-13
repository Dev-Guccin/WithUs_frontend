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
import Button from '@material-ui/core/Button';
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
    const [ScienceEnginnering, setScienceEnginnering] = useState(false);
    const [ContentsWebtoon, setContentsWebtoon] = useState(false);
    const [EnvironmentEnergy, setEnvironmentEnergy] = useState(false);
    const [Employment, setEmployment] = useState(false);
    const [Art, setArt] = useState(false);
    const [Academic, setAcademic] = useState(false);
    const [Idea, setIdea] = useState(false);
    const [UCC, setUCC] = useState(false);
    const [culture, setculture] = useState(false);
    const [Design, setDesign] = useState(false);
    const [Slogan, setSlogan] = useState(false);
    const [Economy, setEconomy] = useState(false);

    const OnScienceEnginneringChange = (event) => {setScienceEnginnering(event.target.checked)};
    const OnsetContentsWebtoonChange = (event) => {setContentsWebtoon(event.target.checked);};
    const OnsetEnvironmentEnergyChange = (event) => {setEnvironmentEnergy(event.target.checked)};
    const OnsetEmploymentChange = (event) => {setEmployment(event.target.checked)};
    const OnsetArtChange = (event) => {setArt(event.target.checked)};
    const OnsetAcademicChange = (event) => {setAcademic(event.target.checked)};
    const OnsetIdeaChange = (event) => {setIdea(event.target.checked)};
    const OnsetUCCChange = (event) => {setUCC(event.target.checked)};
    const OnsetcultureChange = (event) => {setculture(event.target.checked)};
    const OnsetDesignChange = (event) => {setDesign(event.target.checked)};
    const OnsetSloganChange = (event) => {setSlogan(event.target.checked)};
    const OnsetEconomyChange = (event) => {setEconomy(event.target.checked)};

    const onSubmitHandler = (event) => {
      event.preventDefault();
  
      var body = {
        User_code : JSON.parse(localStorage.getItem('user')).User_code,
        ScienceEnginnering : ScienceEnginnering,
        ContentsWebtoon : ContentsWebtoon,
        EnvironmentEnergy : EnvironmentEnergy,
        Employment : Employment,
        Art : Art,
        Academic : Academic,
        Idea : Idea,
        UCC : UCC,
        culture : culture,
        Design : Design,
        Slogan : Slogan,
        Economy : Economy
      }
  
      axios.post('http://localhost:3001/users/Interest', body)
      .then(response => {
        if(response.data.Interest) {
          alert("관심사 추가가 완료되었습니다.");
          document.location.href = "/";
        } else {
          alert("관심사 등록에 실패하였습니다.");
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
          Interest
        </Typography>
          {/* 관심사 추가 */}
          {/* <div className={classes.root}> */}
          <form className={classes.formControl} noValidate onSubmit={onSubmitHandler}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">관심사를 골라주십시오</FormLabel>
                <FormGroup>
                <Grid item direction="column">
                <FormControlLabel
                    control={<Checkbox checked={ScienceEnginnering} onChange={OnScienceEnginneringChange} name="ScienceEnginnering" />}
                    label="ScienceEnginnering"
                />
                <FormControlLabel
                    control={<Checkbox checked={ContentsWebtoon} onChange={OnsetContentsWebtoonChange} name="ContentsWebtoon" />}
                    label="ContentsWebtoon"
                />
                <FormControlLabel
                    control={<Checkbox checked={EnvironmentEnergy} onChange={OnsetEnvironmentEnergyChange} name="EnvironmentEnergy" />}
                    label="EnvironmentEnergy"
                />
                </Grid>
                <Grid item direction="column">
                <FormControlLabel
                    control={<Checkbox checked={Employment} onChange={OnsetEmploymentChange} name="Employment"/>}
                    label="Employment"
                />
                <FormControlLabel
                    control={<Checkbox checked={Art} onChange={OnsetArtChange} name="Art" />}
                    label="Art"
                />
                <FormControlLabel
                    control={<Checkbox checked={Academic} onChange={OnsetAcademicChange} name="Academic" />}
                    label="Academic"
                />
                </Grid>
                <div>
                <FormControlLabel
                    control={<Checkbox checked={Idea} onChange={OnsetIdeaChange} name="Idea" />}
                    label="Idea"
                />
                <FormControlLabel
                    control={<Checkbox checked={UCC} onChange={OnsetUCCChange} name="UCC" />}
                    label="UCC"
                />
                <FormControlLabel
                    control={<Checkbox checked={culture} onChange={OnsetcultureChange} name="culture" />}
                    label="culture"
                />
                </div>
                <div>
                <FormControlLabel
                    control={<Checkbox checked={Design} onChange={OnsetDesignChange} name="Design" />}
                    label="Design"
                />
                <FormControlLabel
                    control={<Checkbox checked={Slogan} onChange={OnsetSloganChange} name="Slogan" />}
                    label="Slogan"
                />
                <FormControlLabel
                    control={<Checkbox checked={Economy} onChange={OnsetEconomyChange} name="Economy" />}
                    label="Economy"
                />
                </div>
                </FormGroup>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Interest Add
                </Button>
            </FormControl>
            </form>
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