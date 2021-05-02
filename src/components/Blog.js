import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import Sidebar from './Sidebar';
import { Route, BrowserRouter as Router } from "react-router-dom"


const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

export default function Blog() {

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
            <h2>여기서부터는 메인페이지</h2>
            <Route exact path="/home" component={Home} />
            <Route path="/about" component={About} />
            </main>
          </Grid>
        </Grid>
      </Container>
      </Router>
    </React.Fragment>
  );
}