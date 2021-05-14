
import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import GradeIcon from '@material-ui/icons/Grade';
import GroupIcon from '@material-ui/icons/Group';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import HouseIcon from '@material-ui/icons/House';
import { Fragment } from 'react';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  textdc: {
    textDecoration: 'none',
    color: 'black',
  },
  writeTB: {
    textAlign: 'center',
  }
}));

const sections = [
  { title: '마이페이지', url: '#'},
  { title: '비밀번호변경', url: '#'},
  { title: '회원탈퇴', url: '/Quit'},
  { title: '관심분야등록/변경', url: '/Interest'},
  { title: '내가 쓴 글', url: '#' },
  { title: '내가 쓴 댓글', url: '#' },
  { title: '즐겨찾기', url: '#' }
];

export default function Sidebar(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <MenuList>
            <Link
            className ={classes.textdc}
            color="inherit"
            noWrap
            key={sections[0].title}
            variant="body2"
            to={sections[0].url}
            >
            <MenuItem>
              <ListItemIcon>
                <HouseIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{sections[0].title}</Typography>
            </MenuItem>
            </Link>

            <Link
            className ={classes.textdc}
            color="inherit"
            noWrap
            key={sections[1].title}
            variant="body2"
            to={sections[1].url}
            >
            <MenuItem>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{sections[1].title}</Typography>
            </MenuItem>
            </Link>

            <Link
            className ={classes.textdc}
            color="inherit"
            noWrap
            key={sections[2].title}
            variant="body2"
            to={sections[2].url}
            >
            <MenuItem>
              <ListItemIcon>
                <CheckBoxIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{sections[2].title}</Typography>
            </MenuItem>
            </Link>

            <Link
            className ={classes.textdc}
            color="inherit"
            noWrap
            key={sections[3].title}
            variant="body2"
            to={sections[3].url}
            >
            <MenuItem>
              <ListItemIcon>
                <CheckBoxIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{sections[3].title}</Typography>
            </MenuItem>
            </Link>
            
            <Link
            className ={classes.textdc}
            color="inherit"
            noWrap
            key={sections[4].title}
            variant="body2"
            to={sections[4].url}
            >
            <Divider/>
            <MenuItem>
              <ListItemIcon>
                <PlaylistAddIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{sections[4].title}</Typography>
            </MenuItem>
            </Link>

            <Link
            className ={classes.textdc}
            color="inherit"
            noWrap
            key={sections[5].title}
            variant="body2"
            to={sections[5].url}
            >
            <MenuItem>
              <ListItemIcon>
                <InsertCommentIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{sections[5].title}</Typography>
            </MenuItem>
            </Link>

            <Divider light={true}/>
            <Link
            className ={classes.textdc}
            color="inherit"
            noWrap
            key={sections[6].title}
            variant="body2"
            to={sections[6].url}
            >
            <MenuItem>
              <ListItemIcon>
                <GradeIcon style={{ fontSize: 30, color: grey[900] }}    />
              </ListItemIcon>
              <Typography variant="button"><strong>{sections[6].title}</strong></Typography>
            </MenuItem>
            </Link>

        </MenuList>
      </Paper>
    </Fragment>

    
    
  );
}