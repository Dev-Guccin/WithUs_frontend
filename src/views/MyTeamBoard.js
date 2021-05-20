import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {red } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {category, bookmarks,categoryImage } from '../../src/testDB';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
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
    }
  
  }));

let imgsrc = '';


export default function TeamboardList(props){
    const classes = useStyles();
    const [TB, setTB] = useState([]);

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const header = {
      "Content-Type": "application/json"
    }


    function getMyTeamBoard() {

      var body = {User_code : JSON.parse(localStorage.getItem('user')).User_code}

      axios.post('http://localhost:3001/users/MyTeamBoard', body, {header})
      .then(response => {
        console.log(response.data.MyTeamBoard);
        setTB(response.data.MyTeamBoard);
      })
    }

    useEffect(()=>{
      getMyTeamBoard()
    },[])

    return(
        <Grid container spacing={3}>
            {TB.map(teamBoard => (
              imgsrc = `https://source.unsplash.com/collection/${teamBoard.User_code}`,
              <Grid item key={teamBoard.TB_code} xs={12} sm={4} md={6}>
                <Card >
                  <Link to={"Teammatedetail/" + String(teamBoard.TB_code)} >
                    <CardMedia
                      className={classes.cardMedia}
                      image= {categoryImage[teamBoard.CT_code]}
                      title="Image title"
                    />
                  </Link>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                    <Link to={"Teammatedetail/" + String(teamBoard.TB_code)} className={classes.linkToDetail}>
                      {teamBoard.TB_title}
                    </Link>
                    </Typography>
                    <CardActions className={classes.root} >
                      <Typography className={classes.writer} >
                      작성자: {JSON.parse(localStorage.user).User_nickname}
                      </Typography>                     
                      {/* <Typography >
                        <VisibilityIcon style={{ fontSize: 18 }}/>&nbsp;108
                      </Typography>
                      <Typography >
                        <ChatBubbleOutlineIcon style={{ fontSize: 18 }}/>&nbsp;10
                      </Typography>                       */}
                    </CardActions>
                    <Link to={"Teammatedetail/" + String(teamBoard.TB_code)} className={classes.linkToDetail}>
                    <div dangerouslySetInnerHTML={{__html: teamBoard.TB_content} }></div> 
                    </Link>        
                  </CardContent>
                  <CardContent>
                    <Typography>
                      종류 : {teamBoard.TB_contestOrProject === 'project' ? '프로젝트' : '공모전'}
                    </Typography>
                    <Typography>
                      카테고리 : {category[teamBoard.CT_code]}
                    </Typography>
                    <Typography>
                      팀원 현황: {teamBoard.TB_recruitnumber}&nbsp;&nbsp;/&nbsp;&nbsp;{teamBoard.TB_finalNumber}
                    </Typography>     
                  </CardContent>                  
                  <CardActions disableSpacing>
                    <Typography variant="overline">
                      {new Date(new Date(teamBoard.TB_createDate) - timezoneOffset).toJSON().substring(0,10)} ~&nbsp;
                    </Typography>
                    <Typography variant="overline">
                      {new Date(new Date(teamBoard.TB_finalDate) - timezoneOffset).toJSON().substring(0,10)}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
    )
}