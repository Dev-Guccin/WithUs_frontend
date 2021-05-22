import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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

export default function Home(props) {
  const classes = useStyles();

  function handleKeywordChange(event) {
    props.setkeyword(event.target.value)
  }
  function sortchange(event) {
    console.log("sortchange:", event.target.value)
    //1->최신순, 2->조회순 3->마감날짜순
    props.setsort(JSON.parse(event.target.value))
  }
  //적용  
  return (
    <Grid container justify="center" alignItems="flex-start">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid container>
            <table>
              <tbody>
                <tr>
                  <td>검색 키워드</td>
                  <td>
                    <input type="search" size={70} placeholder="원하는 키워드를 입력하세요. ex)#과학#통신" value={props.keyword}
                      onChange={(event) => handleKeywordChange(event)}></input>
                    <button onClick={() => props.optionSearch()}>조회</button>
                  </td>
                  <td>
                    <select name="sort" onChange={(event) => sortchange(event)}>
                      <option value="1">최신순</option>
                      <option value="2">마감일자순</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={4}>
            <Paper variant="outlined">
              <Link to={props.represent_sections[0] === undefined ? "" : "Contestdetail/" + String(props.represent_sections[0].CB_code)}>
                <img className={classes.img} alt="complex"
                  src={props.represent_sections[0] === undefined ? "" : props.represent_sections[0].CB_photo} />
              </Link></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Link to={props.represent_sections[1] === undefined ? "" : "Contestdetail/" + String(props.represent_sections[1].CB_code)}>
                <img className={classes.img} alt="complex"
                  src={props.represent_sections[1] === undefined ? "" : props.represent_sections[1].CB_photo}
                />
              </Link></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Link to={props.represent_sections[2] === undefined ? "" : "Contestdetail/" + String(props.represent_sections[2].CB_code)}>
                <img className={classes.img} alt="complex"
                  src={props.represent_sections[2] === undefined ? "" : props.represent_sections[2].CB_photo} />
              </Link></Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={5}><strong>공모전이름</strong></Grid>
      <Grid item xs={2}><strong>주최사</strong></Grid>
      <Grid item xs={2}><strong>시작날짜</strong></Grid>
      <Grid item xs={2}><strong>마감날짜</strong></Grid>
      <Grid item xs={1}><strong>북마크</strong></Grid>
      <Grid item xs={12}>
        {props.sections.map((section) => (
          <Paper key={section.CB_code}>
            {/* <Link to={section === undefined ? "" : "Contestdetail/" + String(section.CB_code)}> */}
            <Homelist section={section}></Homelist>
            {/* </Link> */}
          </Paper>
        ))}
      </Grid>
      <Grid item>
        <Pagination
          bottompage={props.bottompage}
          setbottompage={props.setbottompage}
          setpage={props.setpage} />
      </Grid>
    </Grid>
  );
}