import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import axios from 'axios';
import { Route, BrowserRouter as Router } from "react-router-dom";
// import Routes from './components/Routes'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './views/Home'
import Teammate from './views/Teammate'
import Contestdetail from './views/Contestdetail'
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import TmSidebar from './components/TmSidebar';
import OnlyMyPage from './views/OnlyMyPage';
import Mypage from './views/MyPage';
import MyPageSideBar from './components/MyPageSideBar';
import createTeam from './views/Teamboard/createTeam';


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
        <Header title="WithUs" sections={sections}>
        </Header>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Route path="/" exact={true} component={Sidebar} />
            <Route path="/home" component={Sidebar} />
            <Route path="/contest" component={Sidebar} />
            <Route path="/teammate" component={TmSidebar}/>
            <Route path="/Login" component={Sidebar} />
            <Route path="/SignUp" component={Sidebar} />
            <Route path="/OnlyMyPage" component={MyPageSideBar} /> {/* 본인 마이페이지 수정 */}
            <Route path="/MyPage" component={Sidebar} /> {/* 유저들 마이페이지 조회 */}
          </Grid>
          <Grid item xs={10}>
            <main>
            <Route path="/" exact={true} component={Home} />
            <Route path="/home" exact={true} component={Home} />
            <Route path="/Contestdetail/:CB_code" exact = {true} component={Contestdetail} />
            <Route path="/teammate" exact={true} component={Teammate} />
            <Route path="/Login" exact={true} component={SignIn} />
            <Route path="/SignUp" exact={true} component={SignUp} />
            <Route path="/OnlyMyPage" exact={true} component={OnlyMyPage} /> {/* 본인 마이페이지 수정 */}
            <Route path="/MyPage" exact={true} component={Mypage} /> {/* 유저들 마이페이지 조회 */}
            <Route path='/createTeam' component={createTeam}/>
            </main>
          </Grid>
        </Grid>
      </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
