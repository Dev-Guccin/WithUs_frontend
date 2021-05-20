import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import TeamboardList from './TeamboardList';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));



export default function Teammate(props) {
  const classes = useStyles();

  const [teamBoardLists, setTeamBoardLists] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [filteredLists, setFilteredList] = useState([]);
  const [searchType, setSearchType] = useState("1");

  

  const getTeamBoardLists = async () => {
      await axios.get("http://localhost:3001/teamboard")
      .then(res => {
        console.log({res_data: res.data});
        setTeamBoardLists(res.data);
        setFilteredList(res.data);
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