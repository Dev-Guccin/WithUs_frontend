import React, { useState } from 'react';
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
import {category, bookmarks, cardsinfo } from '../../src/testDB';



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

}));



let imgsrc = '';

export default function Album() {
  const classes = useStyles();

  const [bk, setBookmark] = useState(bookmarks[1]);


  // 북마크 토글
  const toggleBookmark = (tableID) =>{
    if(bk.includes(tableID)){
      setBookmark(bk.filter((el) => el !== tableID));
    }
    else{
      setBookmark([...bk, tableID]);
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
          <Grid container spacing={2}>
            {cardsinfo.map((card) => (
              imgsrc = `https://source.unsplash.com/collection/${card.User_code}`,
              <Grid item key={card} xs={12} sm={6} md={6}>
                <Card className={classes.card.User_code}>
                  <CardMedia
                    className={classes.cardMedia}
                    image= {imgsrc}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                      {card.TB_title}
                    </Typography>
                    <CardActions className={classes.root} >
                      <Typography className={classes.writer} >
                      작성자: 테스트{card.User_code}
                      </Typography>                     
                      <Typography >
                        <VisibilityIcon style={{ fontSize: 18 }}/>&nbsp;108
                      </Typography>
                      <Typography >
                        <ChatBubbleOutlineIcon style={{ fontSize: 18 }}/>&nbsp;10
                      </Typography>                      
                    </CardActions>  

                    <Typography>
                      {card.TB_content}
                    </Typography>        
                  </CardContent>
                  <CardContent>
                  <Typography>
                      카테고리 : {category[card.CT_code]}
                    </Typography>
                    <Typography>
                      팀원 현황: {card.TB_recruitNumber}&nbsp;&nbsp;/&nbsp;&nbsp;{card.TB_finalNumber}
                    </Typography>     
                  </CardContent>                  
                  <CardActions disableSpacing>
                    <Typography variant="overline">
                      {card.TB_createDate} ~&nbsp;
                    </Typography>
                    <Typography variant="overline">
                      {card.TB_finalDate}
                    </Typography>
                      <IconButton size="small" style={{ color: red[800] }} className={classes.cardbookmark} onClick={() => {toggleBookmark(card.TB_code)}}>
                        <FavoriteBorderIcon className={clsx(IsBookmarked(card.TB_code) && classes.menuButtonHidden)}/>
                        <FavoriteIcon className={clsx(!IsBookmarked(card.TB_code) && classes.menuButtonHidden)} />
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