import React, { useEffect } from 'react'; // import 로 useState 를 불러온다!
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

export default function Homelist(props) {
  const section = props.section
  const header = {"Content-Type": "application/json"}

  function IsoToString(date, flag){
    var date = new Date(date);
    if(flag == 0){//start DATE인 경우 시간이 비어있음
      var tmp = date.getFullYear()+"년"+(date.getMonth()+1)+"월"+date.getDate()+"일"
    }
    else{
      var tmp = date.getFullYear()+"년"+(date.getMonth()+1)+"월"+date.getDate()+"일 "+date.getHours()+"시"+date.getMinutes()+"분";
    }
    return tmp
  }
  function AddBookMark() {
    if(JSON.parse(localStorage.getItem('login_check'))) {
      // console.log(section.CB_code);

      var body = {
        User_code : JSON.parse(localStorage.getItem('user')).User_code,
        CB_code : section.CB_code
      }

      axios.post('http://'+localStorage.getItem("backend")+':3001/users/addBookMark', body, {header})
      .then(response => {
        if(response.data.addBookMark) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
    } else {
      alert("로그인이 필요합니다.");
      document.location.href = '/Login';
    }
  }

  useEffect(() => {
    console.log(section);
  }, []);
  return (
    <div className="">
      <Grid container>
        <Grid item xs={5}>
          <Grid container>
            <Grid item xs={12}>
            <Link to={section === undefined ? "" : "Contestdetail/" + String(section.CB_code)}>
              <Typography component="span" color="primary">
                <Grid item xs={12}><strong>{section.CB_title}</strong></Grid>
              </Typography>
            </Link>
            분야: {section.CB_field}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>{section.CB_organization}</Grid>
        <Grid item xs={2}>{IsoToString(section.CB_startDate,0)}</Grid>
        <Grid item xs={2}>{IsoToString(section.CB_finalDate,1)}</Grid>
        {/* <Grid item xs={1}>{section.CB_count}</Grid> */}
        <Grid item xs={1}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={AddBookMark}
            color="secondary"
            // className={classes.submit}
          >
            북마크
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}