import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Homelist from '../components/Homelist';
import Pagination from '../components/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '300px',
    maxHeight: '300px',
  },
}));

export default function Home() {
  const [represent_sections, setrepresent_sections] = useState([]);
  const [sections, setsections] = useState([]);
  const [page, setpage] = useState(1);//실제 보여질 페이지
  const [bottompage, setbottompage] = useState(1);//페이지네이션의 페이지 순서 1=> 1~10, 2=> 11~20
  const classes = useStyles();

  //공모전 데이터 들고오기
  useEffect(() => {
    axios.get('http://localhost:3001/contest/' + page, {//공모전 데이터 들고오기
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response);
      setrepresent_sections(response.data.slice(0, 3));
      setsections(response.data.slice(3));
    })
  }, [page]);
  //데이터 연산

  //적용  
  return (
    <Grid container justify="center" alignItems="flex-start">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Paper variant="outlined">
              <img className={classes.img} alt="complex"
                src={represent_sections[0] === undefined ? "" : represent_sections[0].CB_photo} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <img className={classes.img} alt="complex"
                src={represent_sections[1] === undefined ? "" : represent_sections[1].CB_photo} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <img className={classes.img} alt="complex"
                src={represent_sections[2] === undefined ? "" : represent_sections[2].CB_photo} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {sections.map((section) => (
          <Homelist section={section}></Homelist>
        ))}
      </Grid>
      <Grid item>
        <Pagination 
          bottompage={bottompage} 
          setbottompage={setbottompage} 
          setpage={setpage}/>
      </Grid>
    </Grid>
  );
}