import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {red } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {category, bookmarks,categoryImage } from '../../src/testDB';
import axios from 'axios';


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

  test:{
    
  }

}));



let imgsrc = '';
let userInfo
let user

export default function Teammate(props) {
  const classes = useStyles();

  const [bk, setBookmark] = useState([]);
  const [teamBoardLists, setTeamBoardLists] = useState([]);


  // DB에서 로그인유저 북마크 정보만 가져와서 담기
  const getMyBookmarkTB = async () => {
    await axios.get("http://localhost:3001/bookmarkTB/" + user)
    .then( res => {
      const bk_list = (res.data).map(item => item.TB_code);
      setBookmark(bk_list);
    })
  };

  const deleteBookmarkTB = async (tableID) => {
    console.log("user:", user, "TB_code:", tableID);
    await axios.post("http://localhost:3001/bookmarkTB/delete/" + user, {
      User_code: user,
      TB_code : tableID
    }).then( res => {
      console.log("res:", res.data);
    })
  }
  const addBookmarkTB = async (tableID) => {
    await axios.post("http://localhost:3001/bookmarkTB/add/" + user, {
      User_code: user,
      TB_code : tableID
    }). then(res => {
      console.log("res:", res.data);
    })
  }

  const getTeamBoardLists = async () => {
      await axios.get("http://localhost:3001/teamboard")
      .then(res => {
        setTeamBoardLists(res.data);
      })
  }

  // 팀 모집 게시판 출력
  useEffect( () =>{
    getTeamBoardLists();
  }, []);

  // 로그인 상태일 경우 실행
  useEffect( () =>{
    if(localStorage.user !== undefined){
       userInfo = JSON.parse(localStorage.user);
       user = userInfo["User_code"]
      getMyBookmarkTB();
    }
  }, [])




  // 북마크 토글
  const toggleBookmark = (tableID) =>{

    if(bk.includes(tableID)){
      setBookmark(bk.filter((el) => el !== tableID));
      if(user!==undefined) deleteBookmarkTB(tableID);

    }
    else{
      setBookmark([...bk, tableID]);
      if(user!==undefined) addBookmarkTB(tableID);
    }
  };

  const IsBookmarked = (tableID) => {
    if(bk.includes(tableID)){
      return true;
    }
    else{
      return false;
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={3}>
            {teamBoardLists.map((teamBoard) => (
              imgsrc = `https://source.unsplash.com/collection/${teamBoard.User_code}`,
              <Grid item key={teamBoard.TB_code} xs={12} sm={4} md={6}>
                <Card >
                  <CardMedia
                    className={classes.cardMedia}
                    image= {categoryImage[teamBoard.CT_code]}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                      {teamBoard.TB_title}
                    </Typography>
                    <CardActions className={classes.root} >
                      <Typography className={classes.writer} >
                      작성자: {teamBoard.User_nickname}
                      </Typography>                     
                      <Typography >
                        <VisibilityIcon style={{ fontSize: 18 }}/>&nbsp;108
                      </Typography>
                      <Typography >
                        <ChatBubbleOutlineIcon style={{ fontSize: 18 }}/>&nbsp;10
                      </Typography>                      
                    </CardActions>  

                    <div dangerouslySetInnerHTML={{__html: teamBoard.TB_content} }>
                    </div>        
                  </CardContent>
                  <CardContent>
                    <Typography>
                      종류 : {teamBoard.TB_contestOrProject === 'project' ? '프로젝트' : '공모전'}
                    </Typography>
                    <Typography>
                      카테고리 : {category[teamBoard.CT_code]}
                    </Typography>
                    <Typography>
                      팀원 현황: {teamBoard.TB_recruitNumber}&nbsp;&nbsp;/&nbsp;&nbsp;{teamBoard.TB_finalNumber}
                    </Typography>     
                  </CardContent>                  
                  <CardActions disableSpacing>
                    <Typography variant="overline">
                      {new Date(teamBoard.TB_createDate).toJSON().substring(0,10)} ~&nbsp;
                    </Typography>
                    <Typography variant="overline">
                      {new Date(teamBoard.TB_finalDate).toJSON().substring(0,10)}
                    </Typography>
                      <IconButton size="small" style={{ color: red[800] }} className={classes.cardbookmark} onClick={() => {toggleBookmark(teamBoard.TB_code)}}>
                        <FavoriteBorderIcon className={clsx(IsBookmarked(teamBoard.TB_code) && classes.menuButtonHidden)}/>
                        <FavoriteIcon className={clsx(!IsBookmarked(teamBoard.TB_code) && classes.menuButtonHidden )} />
                      </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}