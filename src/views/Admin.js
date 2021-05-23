import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BrowserRouter as Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    admin_user: {
      border: '1px solid',
      marginBottom: 20
    },
    search: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    total: {
      fontSize: 20,
      margin: '10px'
    }

}));

export default function Admin({ match }) {
    const classes = useStyles();
    const [section, setsection] = useState([]);
    const [section2, setsection2] = useState([]);
    const [section3, setsection3] = useState([]);

    /* 회원정보 검색 이벤트 핸들러 변수 */
    const [User_search, setUser_search] = useState("");
    const onSearchUserHandler = (event) => {setUser_search(event.currentTarget.value);}

    /* 공모전 검색 이벤트 핸들러 변수 */
    const [Compete_search, setCompete_search] = useState("");
    const onSearchCompeteHandler = (event) => {setCompete_search(event.currentTarget.value);}

    /* 팀원모집 게시판 검색 이벤트 핸들러 변수 */
    const [Teammate_search, setTeammate_search] = useState("");
    const onSearchTeammateHandler = (event) => {setTeammate_search(event.currentTarget.value);}
    
    /* 회원정보 검색 버튼을 눌렀을 때의 이벤트 핸들러 */
    const onSubmitSearchUserHandler = (event) => {
      event.preventDefault();
      var body = {
        User_search : User_search
      }
      console.log(body);
      axios.post('http://'+localStorage.getItem("backend")+':3001/admin/search/user/', body)
      .then(response => {
        if(response) {
          alert('검색완료!!!');
          console.log(response.data);
          setsection3(response.data);
        } else {
          alert("Signup Error " + response.data.message);
        }
      });
    }

    /* 공모전 검색 버튼을 눌렀을 때의 이벤트 핸들러 */
    const onSubmitSearchCompeteHandler = (event) => {
      event.preventDefault();
      var body = {
        Compete_search : Compete_search
      }
      console.log(body);
      axios.post('http://'+localStorage.getItem("backend")+':3001/admin/search/compete/', body)
      .then(response => {
        if(response) {
          alert('검색완료!!!');
          console.log(response.data);
          setsection(response.data);
        } else {
          alert("Signup Error " + response.data.message);
        }
      });
    }

    /* 팀원모집 게시판 검색 버튼을 눌렀을 때의 이벤트 핸들러 */
    const onSubmitSearchTeammateHandler = (event) => {
      event.preventDefault();
      var body = {
        Teammate_search : Teammate_search
      }
      console.log(body);
      axios.post('http://'+localStorage.getItem("backend")+':3001/admin/search/teammate/', body)
      .then(response => {
        if(response) {
          alert('검색완료!!!');
          console.log(response.data);
          setsection2(response.data);
        } else {
          alert("Signup Error " + response.data.message);
        }
      });
    }

    /* 회원 삭제 버튼을 눌렀을 때의 이벤트 핸들러 */
    const onDeleteUserHandler = (code) => {
      console.log({code});
      axios.post('http://'+localStorage.getItem("backend")+':3001/admin/delete/user/' + code,{User_code: code} )
        .then(response => {
          if(response) {
            alert('해당 아이디가 삭제되었습니다!!!');
            window.location.reload();
          } else {
            alert("Signup Error " + response.data.message);
          }
        });
    }

    /* 공모전 삭제 버튼을 눌렀을 때의 이벤트 핸들러 */
    const onDeleteCompeteHandler = (code) => {
      console.log({code});
      axios.post('http://'+localStorage.getItem("backend")+':3001/admin/delete/compete/' + code,{CB_code: code} )
        .then(response => {
          if(response) {
            alert('해당 공모전이 삭제되었습니다!!!');
            window.location.reload();
          } else {
            alert("Signup Error " + response.data.message);
          }
        });
    }

    /* 팀원모집 게시글 삭제 버튼을 눌렀을 때의 이벤트 핸들러 */
    const onDeleteTeammateHandler = (code) => {
      console.log({code});
      axios.post('http://'+localStorage.getItem("backend")+':3001/admin/delete/teammate/' + code,{TB_code: code} )
        .then(response => {
          if(response) {
            alert('해당 게시글이 삭제되었습니다!!!');
            window.location.reload();
          } else {
            alert("Signup Error " + response.data.message);
          }
        });
    }

    useEffect(() => {
      axios.get('http://'+localStorage.getItem("backend")+':3001/admin/admin', {//공모전 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setsection(response.data);
      })
    }, []);

    useEffect(() => {
      axios.get('http://'+localStorage.getItem("backend")+':3001/admin/board', {// 팀원모집 게시판 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setsection2(response.data);
      })
    }, []);

    useEffect(() => {
      axios.get('http://'+localStorage.getItem("backend")+':3001/admin/user', {// 팀원모집 게시판 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setsection3(response.data);
      })
    }, []);

    return (
      <React.Fragment>
        <Container maxWidth="lg">
          <h2>관리자 페이지</h2>
          
          <Divider/>
          <Box className={classes.admin_user}>
            <h3>회원 관리</h3>
            <Divider/>
            <Grid container>
              <Grid item xs={3} className={classes.total}>총 회원수: {section3.length}</Grid>
              <Grid item xs={8}>
                <Paper component="form" className={classes.search} onSubmit={onSubmitSearchUserHandler}>
                  <InputBase
                    className={classes.input}
                    placeholder="회원의 아이디를 입력하세요"
                    onChange={onSearchUserHandler}
                  />
                  <IconButton type="submit" className={classes.iconButton}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>아이디</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>닉네임</TableCell>
                    <TableCell>전화번호</TableCell>
                    <TableCell>성별</TableCell>
                    <TableCell>대학</TableCell>
                    <TableCell>전공</TableCell>
                    <TableCell>지역</TableCell>
                    <TableCell>수정하기</TableCell>
                    <TableCell>삭제하기</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section3.map((row) => (
                    <TableRow>
                      <TableCell>{row.User_id}</TableCell>
                      <TableCell>{row.User_name}</TableCell>
                      <TableCell>{row.User_nickname}</TableCell>
                      <TableCell>{row.User_phone}</TableCell>
                      <TableCell>{row.User_gender}</TableCell>
                      <TableCell>{row.User_university}</TableCell>
                      <TableCell>{row.User_major}</TableCell>
                      <TableCell>{row.User_area}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" href={"Admin_modify/" + row.User_code}>수정</Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={()=>{onDeleteUserHandler(row.User_code)}} variant="contained" color="secondary" value={row.User_code}>삭제</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {setUser_search}
            </TableContainer>
          </Box>

          <Box className={classes.admin_user}>
            <h3>공모전 관리</h3>
            <Divider/>
            <Grid container>
              <Grid item xs={3} className={classes.total}>총 공모전수: {section.length}</Grid>
              <Grid item xs={8}>
                <Paper component="form" className={classes.search} onSubmit={onSubmitSearchCompeteHandler}>
                  <InputBase
                    className={classes.input}
                    placeholder="공모전 키워드를 입력하세요"
                    onChange={onSearchCompeteHandler}
                  />
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>코드</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>분야</TableCell>
                    <TableCell>링크</TableCell>
                    <TableCell>바로보기</TableCell>
                    <TableCell>삭제하기</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.map((section) => (
                    <TableRow>
                      <TableCell>{section.CB_code}</TableCell>
                      <TableCell>{section.CB_title}</TableCell>
                      <TableCell>{section.CB_field}</TableCell>
                      <TableCell>{section.CB_link}</TableCell>
                      <TableCell>
                          <Button variant="contained" color="primary" href={section === undefined ? "" : "Contestdetail/" + String(section.CB_code)}>보기</Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={()=>{onDeleteCompeteHandler(section.CB_code)}} variant="contained" color="secondary" value={section.CB_code}>삭제</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box className={classes.admin_user}>
            <h3>팀원모집 게시판 관리</h3>
            <Divider/>
            <Grid container>
              <Grid item xs={3} className={classes.total}>총 게시글수: {section2.length}</Grid>
              <Grid item xs={8}>
                <Paper component="form" className={classes.search} onSubmit={onSubmitSearchTeammateHandler}>
                  <InputBase
                    className={classes.input}
                    placeholder="게시글 키워드를 입력하세요"
                    onChange={onSearchTeammateHandler}
                  />
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>코드</TableCell>
                    <TableCell>글쓴이</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>현재모집인원</TableCell>
                    <TableCell>총모집인원</TableCell>
                    <TableCell>작성일</TableCell>
                    <TableCell>모집마감일</TableCell>
                    <TableCell>바로보기</TableCell>
                    <TableCell>삭제하기</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section2.map((section) => (
                    <TableRow>
                      <TableCell>{section.TB_code}</TableCell>
                      <TableCell>{section.User_code}</TableCell>
                      <TableCell>{section.TB_title}</TableCell>
                      <TableCell>{section.TB_recruitNumber}</TableCell>
                      <TableCell>{section.TB_finalNumber}</TableCell>
                      <TableCell>{section.TB_createDate}</TableCell>
                      <TableCell>{section.TB_finalDate}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" href={"Teammatedetail/" + String(section.TB_code)}>보기</Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={()=>{onDeleteTeammateHandler(section.TB_code)}} variant="contained" color="secondary" value={section.TB_code}>삭제</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </React.Fragment>
    );
  }