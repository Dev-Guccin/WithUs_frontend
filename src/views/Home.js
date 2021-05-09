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
const fieldname = ["환경/에너지", "콘텐츠/웹툰", "취업/창업", "음악/예술", "연구/학술/논문", "아이디어/기획",
  "사진/영상/UCC", "문화/영화/문학", "디자인/미술", "네이밍/슬로건", "금융/경제/경영", "과학/공학/IT"]
const targetname = ["누구나지원", "청소년", "대학(원)생", "취준생", "직장인"]


export default function Home(props) {
  const [represent_sections, setrepresent_sections] = useState([]);
  const [sections, setsections] = useState([]);
  const [page, setpage] = useState(1);//실제 보여질 페이지
  const [bottompage, setbottompage] = useState(1);//페이지네이션의 페이지 순서 1=> 1~10, 2=> 11~20
  const classes = useStyles();

  const [field, setfield] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false
  })
  const [target, settarget] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false, 5: false
  })
  const [keyword, setkeyword] = useState("")

  function handleFieldChange(event) {
    console.log(event)
    const index = event.target.value;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(index)
    let newArr = { ...field }; // copying the old datas array
    newArr[index] = field[index] === true ? false : true
    setfield(newArr)
  }
  function handleTargetChange(event) {
    console.log(event)
    const index = event.target.value;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(index)
    let newArr = { ...target }; // copying the old datas array
    newArr[index] = target[index] === true ? false : true
    settarget(newArr)
  }
  function handleKeywordChange(event) {
    setkeyword(event.target.value)
  }
  //공모전 데이터 들고오기
  function Search() {
    axios.get('http://localhost:3001/contest/' + page, {//공모전 데이터 들고오기
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }).then(response => {
      setrepresent_sections(response.data.slice(0, 3));
      setsections(response.data.slice(3));
    })
  }
  useEffect(() => {
    optionSearch()
  }, [page]);
  //옵션에 따라 공모전 데이터 가져오기
  function optionSearch(event) {
    console.log("option search")
    axios.post('http://localhost:3001/contest/options/' + page, {//공모전 데이터 들고오기
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "field": field,
        "target": target,
        "keyword": keyword,
      }
    }).then(response => {
      console.log(response);
      setrepresent_sections(response.data.slice(0, 3));
      setsections(response.data.slice(3));
    })
  }

  //데이터 연산

  //적용  
  return (
    <Grid container justify="center" alignItems="flex-start">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid container>
            <table>
              <tr>
                <td>분야</td>
                <td>
                  <table>
                    <tr>
                      <td><input type="checkbox" value={0} checked={field[0]} onChange={(event) => handleFieldChange(event)} />환경/에너지</td>
                      <td><input type="checkbox" value={1} checked={field[1]} onChange={(event) => handleFieldChange(event)} />콘텐츠/웹툰</td>
                      <td><input type="checkbox" value={2} checked={field[2]} onChange={(event) => handleFieldChange(event)} />취업/창업</td>
                      <td><input type="checkbox" value={3} checked={field[3]} onChange={(event) => handleFieldChange(event)} />음악/예술</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={4} checked={field[4]} onChange={(event) => handleFieldChange(event)} />연구/학술/논문</td>
                      <td><input type="checkbox" value={5} checked={field[5]} onChange={(event) => handleFieldChange(event)} />아이디어/기획</td>
                      <td><input type="checkbox" value={6} checked={field[6]} onChange={(event) => handleFieldChange(event)} />사진/영상/UCC</td>
                      <td><input type="checkbox" value={7} checked={field[7]} onChange={(event) => handleFieldChange(event)} />문화/영화/문학</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={8} checked={field[8]} onChange={(event) => handleFieldChange(event)} />디자인/미술</td>
                      <td><input type="checkbox" value={9} checked={field[9]} onChange={(event) => handleFieldChange(event)} />네이밍/슬로건</td>
                      <td><input type="checkbox" value={10} checked={field[10]} onChange={(event) => handleFieldChange(event)} />금융/경제/경영</td>
                      <td><input type="checkbox" value={11} checked={field[11]} onChange={(event) => handleFieldChange(event)} />과학/공학/IT</td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>대상</td>
                <td>
                  <table>
                    <tr>
                      <td><input type="checkbox" value={0} checked={target[0]} onChange={(event) => handleTargetChange(event)} />누구나지원</td>
                      <td><input type="checkbox" value={1} checked={target[1]} onChange={(event) => handleTargetChange(event)} />청소년</td>
                      <td><input type="checkbox" value={2} checked={target[2]} onChange={(event) => handleTargetChange(event)} />대학(원)생</td>
                      <td><input type="checkbox" value={3} checked={target[3]} onChange={(event) => handleTargetChange(event)} />취준생</td>
                      <td><input type="checkbox" value={4} checked={target[4]} onChange={(event) => handleTargetChange(event)} />직장인</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>검색 키워드</td>
                <td>
                  <input type="search" size={70} placeholder="원하는 키워드를 입력하세요. ex)#과학#통신" value={keyword}
                    onChange={(event) => handleKeywordChange(event)}></input>
                  <button onClick={() => optionSearch()}>조회</button>
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item xs={4}>
            <Paper variant="outlined">
              <Link to={represent_sections[0] === undefined ? "" : "Contestdetail/" + String(represent_sections[0].CB_code)}>
                <img className={classes.img} alt="complex"
                  src={represent_sections[0] === undefined ? "" : represent_sections[0].CB_photo} />
              </Link></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Link to={represent_sections[1] === undefined ? "" : "Contestdetail/" + String(represent_sections[1].CB_code)}>
                <img className={classes.img} alt="complex"
                  src={represent_sections[1] === undefined ? "" : represent_sections[1].CB_photo}
                />
              </Link></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Link to={represent_sections[2] === undefined ? "" : "Contestdetail/" + String(represent_sections[2].CB_code)}>
                <img className={classes.img} alt="complex"
                  src={represent_sections[2] === undefined ? "" : represent_sections[2].CB_photo} />
              </Link></Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {sections.map((section) => (
          <Link to={section === undefined ? "" : "Contestdetail/" + String(section.CB_code)}>
            <Homelist section={section}></Homelist>
          </Link>))}
      </Grid>
      <Grid item>
        <Pagination
          bottompage={bottompage}
          setbottompage={setbottompage}
          setpage={setpage} />
      </Grid>
    </Grid>
  );
}