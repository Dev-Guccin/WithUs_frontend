
import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const sections = [
  { title: '전체', url: '#' },
  { title: '기획/아이디어', url: '#' },
  { title: '광고/마케팅', url: '#' },
  { title: '논문/리포트', url: '#' },
  { title: '영상/UCC/사진', url: '#' },
  { title: '디자인/캐릭터/웹툰', url: '#' },
  { title: '웹/모바일/플래시', url: '#' },
  { title: '게임/소프트웨어', url: '#' },
  { title: '과학/공학', url: '#' },
  { title: '문학/글/시나리오', url: '#' },
];
export default function Sidebar(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <MenuList>
        {sections.map((section) => (
          <MenuItem>
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            className={classes.toolbarLink}
            >
            {section.title}
          </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}