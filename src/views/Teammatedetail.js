import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import clsx from 'clsx';
import {useHistory} from 'react-router-dom'
import { Typography } from '@material-ui/core';
import UpdateTeam from './Teamboard/updateTeam';
import {category, bookmarks,categoryImage } from '../../src/testDB';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 400,
    },
    contest_main: {
      padding: '30px',
    },
    contain_div: {
      marginTop: 30,
      background: 'gray',
      borderRadius: 20
    },
    imgtest: {
      height: 300,
      margin: 20
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      padding:20
    },
    boardinfo: {
      fontWeight: 'bold'
    },
    list: {
      fontWeight: 'bold',
      fontSize: 20
    },
    button_div: {
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 30
    },
    btn: {
      lineHeight: 222,
      height: 30,
      width: 'auto',
      fontSize: 30,
      margin: 0,
    },
    divider: {
      color: "black",
      marginTop: 30,
      marginLeft: 30
    },
    reply: {
      border: "1px solid",
      marginTop: 10,
    },
    reply_content: {
      marginTop: 10
    },
    avar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    comment: {
      width: 570,
      height: 30,
      marginTop: 30
    },
    updateDeleteBtn: {
      float: 'right'
    },
    menuButtonHidden: {
      display: 'none',
    },
    comment_title: {
      height: 30,
      marginTop: 30,
      backgroundColor: '#dcdcde'
    }

}));

export default function Teammatedetail({ match }) {
    const classes = useStyles();
    const [section, setsection] = useState([]);
    const [section2, setsection2] = useState([]);
    const [IsModify, setIsModify] = useState(false);
    const [comment, setComment] = useState("");
    const [applyInfo, setApplyInfo] = useState([]);
    

    const userInfo = localStorage.user;
    const history = useHistory();
    const tableCode = match.params.TB_code;

    const getApplyInfo = async () =>{
      await axios.get('http://localhost:3001/teamboard/applyinfo',{
        params:{
          TB_code: tableCode,
          waiter_code: (userInfo === undefined ? 0 : JSON.parse(userInfo).User_code)
        }
      }
     ).then(res => {
        res.data.map((item) =>{

        })
        console.log("res.data:",res.data);
        setApplyInfo(res.data);
      })
    }

    useEffect(async() => {
      await axios.get('http://localhost:3001/team/detail/' + match.params.TB_code, {//공모전 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log("sdf",response.data);
        setsection(response.data[0]);
      })
    }, []);

    useEffect(() => {
      axios.get('http://localhost:3001/team/reply/' + match.params.TB_code, {//공모전 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setsection2(response.data);
      })
    }, []);

    useEffect(() => {
      getApplyInfo();
    },[]);

    // 작성자인지 확인
    const IsWriter = (userCode) => {
      if(userInfo === undefined || JSON.parse(userInfo).User_code !== userCode) { return false;}
      else { return true; }
      }

    //삭제
    async function onClickDelete() {
      if(window.confirm("게시글을 삭제하시겠습니까?")){
        await axios.post('http://localhost:3001/teamboard/delete/' + section.TB_code, 
        {
          TB_code: section.TB_code
        }).then( res => {
          console.log(res.data);
          history.push('/teammate');
        })
      }
      else{
          console.log("canceled");
       }
     }

     const onClickUpdate = () =>{
       setIsModify(true);
     }
     // 로그인 확인
     const IsLogin = () => {
      if(userInfo === undefined) { return false;}
      else { return true; }
      }

     // 가입신청
     async function onClickApply() {
       if(!IsLogin()){ alert("가입신청을 하시려면 로그인을 해주세요"); return;}

       if(window.confirm("가입신청 하시겠습니까?")){
         if(!applyInfo.length){ //빈배열(최초 가입)경우 !applyInfo.lengh: 빈배열 true, 값o false
            await axios.post('http://localhost:3001/teamboard/apply',
          {
            waiter_code: JSON.parse(userInfo).User_code,
            TB_code: section.TB_code,
            User_code: section.User_code,
            CT_code: section.CT_code,
            waiter_content: comment,
            waiter_nickname: JSON.parse(userInfo).User_nickname,
            reApply: false  // 재가입 유무 false:최초가입, true: 재가입
          }).then( res => {
            console.log("res:",res.data);
            history.push('/teammate');
          })}
          else{ // 재가입 경우
            await axios.post('http://localhost:3001/teamboard/apply',
          {
            waiter_code: JSON.parse(userInfo).User_code,
            TB_code: section.TB_code,
            User_code: section.User_code,
            CT_code: section.CT_code,
            waiter_content: comment,
            waiter_nickname: JSON.parse(userInfo).User_nickname,
            reApply: true
          }).then( res => {
            console.log("res:",res.data);
            history.push('/teammate');
          })} 
      }
    }



  
    return (
      <React.Fragment>
        {IsModify ? <UpdateTeam TBinfo={section}/> : 
        <main>
          <Container maxWidth="lg">
            <h3>팀원모집 게시판</h3>
            <Divider/>
            <div className={classes.contain_div}>
              <div className={classes.title}>제목: {section.TB_title}</div>
              <nav className={classes.updateDeleteBtn}>
                <Button variant="contained" color="grey" onClick={onClickDelete} className={clsx(!IsWriter(section.User_code) && classes.menuButtonHidden)}>삭제</Button>
                
                <Button variant="contained" color="grey" onClick={onClickUpdate} className={clsx(!IsWriter(section.User_code) && classes.menuButtonHidden)}>수정</Button>
                
              </nav>
              <Divider/>
              <Grid container>
                <Grid item xs={4} className={classes.boardinfo}>작성자: {section.User_nickname} </Grid>
                <Grid item xs={4} className={classes.boardinfo}>작성일: {section.TB_createDate}</Grid>
                {/* <Grid item xs={2} className={classes.boardinfo}>조회수: </Grid>
                <Grid item xs={2} className={classes.boardinfo}>댓글: </Grid> */}
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <img className={classes.imgtest} src={categoryImage[section.CT_code]}></img>
                </Grid>
                <Grid item xs={6}>
                  <List>
                    <ListItem className={classes.list}>종류: {section.TB_contestOrProject === 'project' ? '프로젝트' : '공모전'}</ListItem>
                    <ListItem className={classes.list}>카테고리: {category[section.CT_code]}</ListItem>
                    <ListItem className={classes.list}>모집기간: {section.TB_createDate} ~&nbsp;{section.TB_finalDate}</ListItem>
                    <ListItem className={classes.list}>팀원현황: {section.TB_recruitNumber} / {section.TB_finalNumber}</ListItem>
                    {section.TB_CBcode!==0 ? (<ListItem className={classes.list}><Link to={"../Contestdetail/" + section.TB_CBcode} >공모전 바로가기</Link></ListItem>): null}
                  </List>
                </Grid>
              </Grid>
              {(!applyInfo.length || applyInfo[0].waiter_enter === 2)? (!(section.TB_recruitNumber === section.TB_finalNumber) ?
              <Grid container className={clsx(IsWriter(section.User_code) && classes.menuButtonHidden)}>
                <Grid item xs={1} >
                  <Paper className={classes.comment_title}><Typography style={{textAlign:'center'}}><strong>코멘트: </strong></Typography></Paper>
                </Grid>
                <Grid item xs={7}>
                  <input type="text" className={classes.comment} onChange={(e)=>setComment(e.target.value)} required></input>
                </Grid>
                <Grid className={classes.button_div} item xs={2}>
                  <Button className={classes.btn} variant="contained" color="primary" onClick={onClickApply}>
                    가입하기
                  </Button>
                </Grid>
              </Grid> : "")
              :(applyInfo[0].waiter_enter === 1 || section.TB_recruitNumber === section.TB_finalNumber ? "" :
              <Paper>
              <Typography>가입 심사 중입니다 기다려주세요</Typography>
              </Paper> 
              )}
              <Container>
                <div dangerouslySetInnerHTML={{__html: section.TB_content} }></div>
              </Container>
              <Divider className={classes.divider} />
              {section2.map((section) => (
                <Container className={classes.reply}>
                  <Grid container>
                    <Grid item xs={0.5}>
                      <Avatar className={classes.avar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid item xs={1}>
                      {section.TBR_writer}
                    </Grid>
                    <Grid item xs={2}>
                      {section.TBR_createDate}
                    </Grid>
                  </Grid>
                  <Container className={classes.reply_content}>
                    {section.TBR_content}
                  </Container>
                </Container>
              ))}
            </div>
          </Container>
        </main>
        }
      </React.Fragment>
    );
  }
