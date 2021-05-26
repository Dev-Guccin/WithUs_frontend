import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
  },
  contest_main: {
    padding: '30px',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '500px',
    maxHeight: '500px',
  },
  ul:{
    listStyle:'none',
    fontSize:'20px',
    fontWeight:'600'
  }
}));

export default function Contestdetail( {match }) {
  const classes = useStyles();
  const [section, setsection] = useState([]);

  useEffect(() => {
    axios.get('http://'+localStorage.getItem("backend")+':3001/contest/detail/' + match.params.CB_code, {//공모전 데이터 들고오기
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response.data);
      setsection(response.data[0]);
      console.log(response.data[0]);
    })
  }, []);
  return (
    <div >
      <h2>공모전 대외활동 정보</h2>
      <div>
        <h2>{section.CB_title}</h2>
      </div>
      <hr/>
      <div className={classes.contest_main}>
        <table align="center">
          <tbody>

          <tr>
            <td><div>
              <img className={classes.img} src={section === undefined ? "" : section.CB_photo} />
            </div></td>
            <td>
              <div>
                <ul className={classes.ul}>
                  <li><span>주최주관 : </span>{section.CB_organization}</li>
                  <li><span>지원기간 : </span>{section.CB_startDate} ~ {section.CB_finalDate}</li>
                  <li><span>활동분야 : </span>{section.CB_field}</li>
                  <li><span>자격요건 : </span>{section.CB_target}</li>
                  <li><span>시상내역 : </span>{section.CB_field}</li>
                  <li><span>관련링크 : </span><a href={section.CB_link}>{section.CB_link}</a></li>
                </ul>
              </div></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div dangerouslySetInnerHTML={ {__html: section.CB_content} }/>
    </div>
  );
}