import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Editor from './teamboardEditor';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import SearchBar from './searchBarContest';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/home">
        Withus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    
    position: 'relative',
  },
  layout: {
    width: 600,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(960)]: {
      width: 800,   // 게시글 작성 width
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    float: 'right',
    marginLeft: theme.spacing(1),
  },
  header:{
    display: 'flex',
    paddingTop:'25px'
  }
}));

const categories = [
  {
    value: 1,
    label: '사진/영상/UCC',
  },
  {
    value: 2,
    label: '콘텐츠/웹툰',
  },
  {
    value: 3,
    label: '아이디어/기획',
  },
  {
    value: 4,
    label: '취업/창업',
  },
  {
    value: 5,
    label: '디자인/미술',
  },
  {
    value: 6,
    label: '과학/공학/IT',
  },
  {
    value: 7,
    label: '음악/예술',
  },
  {
    value: 8,
    label: '금융/경제/경영',
  },
  {
    value: 9,
    label: '환경/에너지',
  },
  {
    value: 10,
    label: '취업/창업',
  },
  {
    value: 11,
    label: '문화/영화/문학',
  },
  {
    value: 12,
    label: '연구/학술/논문',
  },
];

export default function Teamboard() {
  const classes = useStyles();
  const [contestOrProject, setContestOrProject] = useState('contest');
  const [title, setTitle] = useState('');
  const [recruit, setRecruit] = useState(4);
  const [category, setCategory] = useState(1);
  const [finalDate,setFinalDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [contestInfo, setContestInfo] = useState({data: [], keyword: "", results: [], CB_code: -1});

  const logincheck = localStorage.login_check;


  const history = useHistory();

  const onTypeChange = (e) => {
    setContestOrProject(e.target.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const onRecruitChange = (e) => {
    setRecruit(e.target.value);
  }
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const onFinalDateChange = (e) => {
    setFinalDate(e.target.value);
  }
  function onEditorChange(value) {
      setContent(value);
  }
  const updateField = (value,code, update = true) => {
    if(update){
      onSearch(value);
    }else{
      setContestInfo({
        ...contestInfo,
        ["results"]: [],
        ["keyword"]: value,
        ["CB_code"]: code
      });
    }
  }

  const IsMatch = (info, keyword) => {
    //const keyLength = keyword.length;
    info = info.toLowerCase()
    if (keyword === "") return false;
    return info.includes(keyword.toLowerCase());
  };

  const onSearch = (text) =>{
    const searchResults = (contestInfo.data).filter((item) => true === IsMatch(item.CB_title, text))
    setContestInfo({
      ...contestInfo,
      ["results"]: searchResults.slice(0,6),
      ["keyword"]: text,
      ["CB_code"]: -1
    });

    
  }
  async function getContestInfo() {
    await axios.get('http://'+localStorage.getItem("backend")+':3001/teamboard/contestinfo')
    .then(res =>{
      
      setContestInfo({
        data: res.data,
        keyword: "",
        results: [],
        CB_code: -1
      });
    });
    
  }

  
  async function onClickComplete() {

    if( logincheck === undefined || JSON.parse(logincheck) === false){
      alert("로그인한 사용자만 팀원 모집글을 작성할수 있습니다.");
      history.push('/teammate');
      return;
    }
    if(contestOrProject === "contest" && contestInfo.CB_code === -1) {
      alert("공모전을 정확히 선택해주세요"); return;
    }

    if(title.trim() === '') {
      alert('제목을 입력해주세요'); return;
    }
    if(content.trim() === '') {
      alert('내용을 입력해주세요'); return;
    }
    if( (new Date(finalDate).getTime() - new Date().getTime()) < 0 ) {
      alert('마감 날짜를 하루 이상으로 설정해주세요'); return;
    }
   
    const userInfo = JSON.parse(localStorage.user);

    const body = {
      User_code: userInfo["User_code"],
      CT_code: category,
      TB_title: title,
      TB_finalNumber: recruit,
      TB_content: content,
      TB_finalDate: finalDate,
      TB_contestOrProject: contestOrProject,
      TB_CBcode: (contestOrProject === "project" ? 0 : contestInfo.CB_code)
    }

    await axios.post('http://'+localStorage.getItem("backend")+':3001/teamboard', body)
    .then(res => {
      
      history.push('/teammate');
    })

  }
  useEffect( () =>{
    getContestInfo();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            팀원 모집 게시글 작성
          </Typography>
          <React.Fragment>
            <header className={classes.header}>
              <FormControl component="fieldset">
                <FormLabel component="legend">팀원 모집 분류</FormLabel>
                <RadioGroup aria-label="contestOrProject" name="contestOrProject" value={contestOrProject} onChange={onTypeChange}>
                  <FormControlLabel value="contest" control={<Radio />} label="공모전" />
                  <FormControlLabel value="project" control={<Radio />} label="프로젝트" />
                </RadioGroup>
              </FormControl>
              {contestOrProject === 'contest' ? <SearchBar keyword={contestInfo.keyword} results={contestInfo.results} code={contestInfo.CB_code} updateField={updateField}/>
              : null}
            </header>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="CB_title"
                  name="CB_title"
                  label="제목"
                  placeholder="위더스 팀원 모집합니다" 
                  onChange={onTitleChange} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="recruitNumber"
                  name="recruitNumber"
                  label="모집인원"
                  type="number"
                  variant="outlined"  
                  value={recruit}
                  onChange={onRecruitChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  id="CT_code"
                  name="CT_code"
                  label="카테고리"
                  value={category}
                  onChange={onCategoryChange}
                >
                  {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="CT_finalDate"
                  name="CT_finalDate"
                  label="마감 날짜"
                  fullWidth
                  type="date"
                  variant="outlined"
                  onChange ={onFinalDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor value={content} onChange={onEditorChange} />
              </Grid>
              <Grid item xs={12}>
                <Button
                variant="contained"
                color="grey[500]"
                className={classes.button}
                onClick={onClickComplete}
                ><strong>완료</strong></Button>
              </Grid>
            </Grid>
  
            </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
