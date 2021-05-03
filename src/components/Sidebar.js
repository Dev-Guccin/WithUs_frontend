
import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const sections = [
  { title: '사진/영상/UCC', url: '#' },
  { title: '콘텐츠/웹툰', url: '#' },
  { title: '아이디어/기획', url: '#' },
  { title: '취업/창업', url: '#' },
  { title: '디자인/미술', url: '#' },
  { title: '과학/공학/IT', url: '#' },
  { title: '음악/예술', url: '#' },
  { title: '금융/경제/경영', url: '#' },
  { title: '환경/에너지', url: '#' },
  { title: '네이밍/슬로건', url: '#' },
  { title: '문화/영화/문학', url: '#' },
  { title: '연구/학술/논문', url: '#' },
];

export default function Sidebar(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <MenuList>
        {sections.map((section) => (
          <Link
          color="inherit"
          noWrap
          key={section.title}
          variant="body2"
          to={section.url}
          >
          <MenuItem>
            {section.title}
          </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Paper>
  );
}