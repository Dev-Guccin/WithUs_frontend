import React, { useState, Component, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    table: {
        minWidth: 650,
    },
    margin:{

    }
}));

export default function ApplicationList(props) {
    axios.defaults.withCredentials = true;
    const header = {
        "Content-Type": "application/json"
    }
    const classes = useStyles();
    const [ContestBookMark, setContestBookMark] = useState([]);

    useEffect(()=>{
        getContestBookMark()        
    },[ContestBookMark])

    function getContestBookMark() {

        var body = {
            User_code : JSON.parse(localStorage.getItem('user')).User_code
            // CB_code : section.CB_code
        }
        axios.post('http://localhost:3001/users/getBookMark', body, {header})
        .then(response => {
            setContestBookMark(response.data.BookMarkList);
        })
    }

    function DeleteBookMark(CB_code) {
        var body = {
            User_code : JSON.parse(localStorage.getItem('user')).User_code,
            CB_code : CB_code
        }

        axios.post('http://localhost:3001/users/DeleteBookMark', body, {header})
        .then(response => {
            if(response.data.DeleteBookMark) {
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
        })
    }

    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    공모전 즐겨찾기
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            {ContestBookMark.map((row) => (
                                <TableRow key={row.CB_code}>
                                    <TableCell>
                                        <TableRow>제목:<strong>{row.CB_title}</strong></TableRow>
                                        <TableRow>신청기간:<strong>{row.CB_startDate}~{row.CB_finalDate}</strong></TableRow>
                                        <TableRow>지원대상:<strong>{row.CB_target}</strong></TableRow>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Button variant="contained" color="default">
                                        <Link to={"Contestdetail/" + row.CB_code} color = "default">
                                                바로가기
                                        </Link>
                                        </Button>
                                    
                                        <Button variant="contained" color="secondary" onClick={() => DeleteBookMark(row.CB_code)}>북마크해제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}