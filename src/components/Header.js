import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbar: {
    borderBottom: `1px solid`,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div>
      <Toolbar>
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper className={classes.paper}>로고</Paper>
          </Grid>
          <Grid item xs>
            <div align="center">
              WITH US
            </div>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>로그인 및 회원가입</Paper>
          </Grid>
        </Grid>
        
      </Toolbar>
      <Grid container spacing={0}>
          <Grid item xs>공모전</Grid>
          <Grid item xs>팀원모집</Grid>
          <Grid item xs>추천</Grid>
      </Grid>
        
    </div>

  );
}

export default App;
