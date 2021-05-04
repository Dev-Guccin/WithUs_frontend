
import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GroupIcon from '@material-ui/icons/Group';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
  { title: '전체', url: '#' },
  { title: '공모전', url: '#' },
  { title: '프로젝트', url: '#' },
  { title: '팀원 모집하기', url: '#'}
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
                <AllInclusiveIcon fontSize="small" />
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
            <Divider/>
            <MenuItem>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
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
                <PeopleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{sections[2].title}</Typography>
            </MenuItem>
            </Link>
            <Divider light={true}/>
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
                <GroupAddIcon style={{ fontSize: 30, color: grey[900] }}    />
              </ListItemIcon>
              <Typography variant="button"><strong>{sections[3].title}</strong></Typography>
            </MenuItem>
            </Link>
        </MenuList>
      </Paper>
    </Fragment>

    
    
  );
}