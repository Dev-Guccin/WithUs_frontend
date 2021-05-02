import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './App.css';
import axios from 'axios';
import Header from './components/Header'


function App() {
  const [test, settest] = useState();
  const classes = 'test';

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    axios.get('http://localhost:3001/test', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response)
      settest(response.data)
    });
  });
  return (
    <div>
      <Header></Header>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>사이드뷰</Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>메인뷰</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
