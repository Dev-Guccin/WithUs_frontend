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
import Contest from './views/Contest'
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

const sections = [
  { title: 'Home', url: '/home' },
  { title: 'Contest', url: '/contest' },
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
  const [test, settest] = useState();

  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    axios.get('http://localhost:3001/test', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response)
      console.log(test)
      settest(response.data)
    });
  });
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
      <Container maxWidth="lg">
        <Header title="WithUs" sections={sections} />
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Sidebar/>
          </Grid>
          <Grid item xs={10}>
            <main>
            {/* <h2>여기서부터는 메인페이지</h2> */}
            <Route path="/home" component={Home} />
            <Route path="/contest" component={Contest} />
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
