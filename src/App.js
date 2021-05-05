import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import axios from 'axios';
import { Route, BrowserRouter as Router } from "react-router-dom";
// import Routes from './components/Routes'
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import Home from './views/Home'
import Teammate from './views/Teammate'
import Contestdetail from './views/Contestdetail'
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import TmSidebar from './components/TmSidebar';

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Contest', url: '/home' },
  { title: 'Teammate', url: '/teammate' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

function App(){
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
      <Container maxWidth="lg">
        <Header title="WithUs" sections={sections} />
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Route path="/home" component={Sidebar} />
            <Route path="/contest" component={Sidebar} />
            <Route path="/teammate" component={TmSidebar}/>
            <Route path="/Login" component={Sidebar} />
            <Route path="/SignUp" component={Sidebar} />
          </Grid>
          <Grid item xs={10}>
            <main>
            {/* <h2>여기서부터는 메인페이지</h2> */}
            <Route path="/home" component={Home} />
            <Route path="/Contestdetail/:CB_code" component={Contestdetail} />
            <Route path="/teammate" component={Teammate} />
            <Route path="/Login" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            </main>
          </Grid>
        </Grid>
      </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
