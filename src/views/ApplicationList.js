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

    },
    linkToDetail:{
        textDecoration: 'none',
        color: 'black',
      },
}));

export default function ApplicationList(props) {
    axios.defaults.withCredentials = true;
    const header = {
        "Content-Type": "application/json"
    }
    const classes = useStyles();
    const [Applicants, setApplicants] = useState([])
    useEffect(() => {
        getApplicationList()
    }, [])
    function getApplicationList() {
        console.log("start !!!!!")
        var user_id = JSON.parse(localStorage.getItem("user")).User_code;
        axios.get('http://' + localStorage.getItem("backend") + ':3001/users/ApplicationList/' + user_id, {//
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            setApplicants(response.data)
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
                    신청 목록
                </Typography>
                {Applicants.map((row) => (   
                <TableContainer component={Paper}>
                    <Link to={"Teammatedetail/" + row.TB_code} className={classes.linkToDetail}>    
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                                <TableRow key={row.name}>
                                    <TableCell width="50%">
                                        <Link className={classes.linkToDetail} to={{
                                            pathname: '/Teammatedetail/'+row.TB_code,
                                        }}>
                                            <TableRow>제목:{row.TB_title}</TableRow>
                                        </Link>                              
                                        <TableRow>종류:{row.TB_contestOrProject === 'project' ? '프로젝트' : '공모전'}</TableRow>
                                    </TableCell>
                                    <TableCell width="30%">
                                        <TableRow>신청시간:{row.waiter_time}</TableRow>
                                        <TableRow>카테고리:{category[row.CT_code]}</TableRow>
                                    </TableCell>
                                    <TableCell width="20%" align="right">
                                        {row.waiter_enter === 0 ? <Button variant="contained" color="primary">대기중</Button> : ''}
                                        {row.waiter_enter === 1 ? <Button variant="contained" color="default">가입허가 처리됨</Button> : ''}
                                        {row.waiter_enter === 2 ? <Button variant="contained" color="secondary">가입거부 처리됨</Button> : ''}
                                    </TableCell>
                                </TableRow>
                                <TableRow><TableCell colSpan={4}><strong style={{fontSize:18}}>하고싶은 말:&nbsp;&nbsp;</strong>{row.waiter_content}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                    </Link>
                </TableContainer>
                ))}
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}