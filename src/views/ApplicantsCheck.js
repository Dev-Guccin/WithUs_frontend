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
import { category, categoryImage } from '../../src/testDB';

import { Link } from 'react-router-dom';

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
    margin: {

    }
}));

export default function ApplicantsCheck(props) {
    axios.defaults.withCredentials = true;
    const header = {
        "Content-Type": "application/json"
    }
    const classes = useStyles();
    const [Applicants, setApplicants] = useState([])
    const [status, setstatus] = useState(0)

    useEffect(() => {
        getApplicantsList()
    }, [status])
    function getApplicantsList() {
        console.log("start !!!!!")
        var user_id = JSON.parse(localStorage.getItem("user")).User_code;
        axios.get('http://' + localStorage.getItem("backend") + ':3001/users/ApplicantsCheck/' + user_id, {//
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            setApplicants(response.data)
        })
    }
    function updateWaiter(data) {
        console.log("start !!!!!")
        axios.post('http://' + localStorage.getItem("backend") + ':3001/users/ApplicantsCheck/', {
            headers: {
                'Content-Type': 'application/json'
            },
            data,
        }).then(response => {
            console.log(response.data);
            setstatus(!status)
        })
    }
    function btnclick(json) {
        console.log("state:", json)
        // 버튼을 누를때 1->가입허가, 2->가입거부
        updateWaiter(json)
    }

    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    신청자 목록
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            {Applicants.map((row) => (
                                <TableRow key={row.user_name} >
                                    <TableCell>
                                        <TableRow>제목: {row.TB_title}</TableRow>
                                        <TableRow>종류: {row.TB_contestOrProject === 'project' ? '프로젝트' : '공모전'}</TableRow>
                                    </TableCell>
                                    <TableCell>
                                        <TableRow>신청시간: {row.waiter_time}</TableRow>
                                        <TableRow>카테고리: {category[row.CT_code]}</TableRow>
                                    </TableCell>
                                    <TableCell>
                                        <TableRow>
                                            <Link to={{
                                                pathname:'/MyPage',
                                                user:{
                                                    user_name:row.user_name
                                                },
                                            }}>
                                                신청자: {row.user_name}
                                            </Link>
                                        </TableRow>
                                        <TableRow>현재팀현황: {row.TB_recruitNumber}/{row.TB_finalNumber}</TableRow>
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.waiter_enter === 0 && row.TB_recruitNumber < row.TB_finalNumber ?
                                            <div>
                                                <Button variant="contained" color="primary" onClick={() =>
                                                    btnclick({ state: 1, TB_code: row.TB_code, waiter_code: row.waiter_code })}>가입허가</Button>
                                                <Button variant="contained" color="secondary" onClick={() =>
                                                    btnclick({ state: 2, TB_code: row.TB_code, waiter_code: row.waiter_code })}>가입거부</Button>
                                            </div> : <Button variant="contained" color="default">종료</Button>}
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