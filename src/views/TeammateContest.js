import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import TeamboardList from './TeamboardList';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  cardbookmark: {
    marginLeft: 'auto'
  },
  writer:{
    flexGrow: "1"
  },
  menuButtonHidden: {
    display: 'none',
  },

  linkToDetail:{
    textDecoration: 'none',
    color: 'black'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));



export default function Teammate(props) {
  const classes = useStyles();

  const [teamBoardLists, setTeamBoardLists] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [filteredLists, setFilteredList] = useState([]);
  const [searchType, setSearchType] = useState("1");

  

  const getTeamBoardLists = async () => {
      let listOfContest = []
      await axios.get("http://localhost:3001/teamboard")
      .then(res => {
          res.data.map((teamObject) => {
              if(teamObject.TB_contestOrProject === "contest") listOfContest.push(teamObject);       
          })
        console.log(listOfContest);
        setTeamBoardLists(listOfContest);
        setFilteredList(listOfContest);
      })
  }
  const testfunc = () => {
    console.log({userInput, searchType});
    setFilteredList(teamBoardLists.filter((teamboard) => {
      switch (searchType) {
        case "1" : // 제목+내용
          return  teamboard.TB_title.toLowerCase().includes(userInput) || teamboard.TB_content.toLowerCase().includes(userInput);
        case '2':  // 제목
          return teamboard.TB_title.toLowerCase().includes(userInput);
        case '3':  // 내용
          return teamboard.TB_content.toLowerCase().includes(userInput);
        case '4':  // 글쓴이
          return teamboard.User_nickname.includes(userInput);
      }

  }));
  };
  
  const handleInput = async (e) => {
    setUserInput(e.target.value);
  }
  const handleChange = (e) => {
    setSearchType(e.target.value);
  };

  // 팀 모집 게시판 출력
  useEffect( () =>{
    getTeamBoardLists();
    console.log({filteredLists, teamBoardLists});
    console.log({propskey: props.randomKey});
    console.log({props});
  }, [props.randomKey]);


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <FormControl className={classes.formControl}>
            <NativeSelect
              onChange={(e) => handleChange(e)}
              value={searchType}
            >
              <option value={1}>제목+내용</option>
              <option value={2}>제목</option>
              <option value={3}>내용</option>
              <option value={4}>글쓴이</option>
            </NativeSelect>
          </FormControl>
          <input
          type="search"
          placeholder="제목+내용 검색"
          onChange={handleInput}
          />
          <Button color="primary" component="span" onClick={() => {testfunc()}} >
            검색
          </Button>
          <TeamboardList tbList={filteredLists}/>  
        </Container>
      </main>
    </React.Fragment>
  );
}