import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import clsx from 'clsx';
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import TeamboardList from './TeamboardList';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import SearchIcon from '@material-ui/icons/Search';
import { Fragment } from 'react';



const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  formControl: {
    marginRight: '10px' ,
    marginBottom: '20px',
    minWidth: 100,
  },
}));



export default function Teammate(props) {
  const classes = useStyles();

  const [teamBoardLists, setTeamBoardLists] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [filteredLists, setFilteredList] = useState([]);
  const [searchType, setSearchType] = useState("1");
  const [placeholder, setPlaceholder] = useState("제목+내용 검색");

  

  const getTeamBoardLists = async () => {
      let listOfContest = []
      await axios.get("http://localhost:3001/teamboard")
      .then(res => {
          res.data.map((teamObject) => {
              if(teamObject.TB_contestOrProject === "contest") listOfContest.push(teamObject);       
          })
        setTeamBoardLists(listOfContest);
        setFilteredList(listOfContest);
      })
  }
  const search = () => {
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
    setPlaceholder(e.target[e.target.value-1].innerText + " 검색");
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
          <Fragment style={{marginBottom: 20}}>
            <input
            type="search"
            placeholder={placeholder}
            onChange={handleInput}
            />
            <Button style={{ padding : 5, minWidth: 22}} color="primary" component="span" onClick={() => {search()}} >
              <SearchIcon/>
            </Button>
          </Fragment>
          <TeamboardList tbList={filteredLists}/>  
        </Container>
      </main>
    </React.Fragment>
  );
}