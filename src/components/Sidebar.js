
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
    //marginRight: theme.spacing(2),

  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  function handleFieldChange(event) {
    console.log(event)
    const index = event.target.value;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(index)
    let newArr = { ...props.field }; // copying the old datas array
    newArr[index] = props.field[index] === true ? false : true
    props.setfield(newArr)
  }
  function handleTargetChange(event) {
    console.log(event)
    const index = event.target.value;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(index)
    let newArr = { ...props.target }; // copying the old datas array
    newArr[index] = props.target[index] === true ? false : true
    props.settarget(newArr)
  }
  return (
    <Paper className={classes.paper}>
      <MenuList>
        <table>
          <tbody>
            <tr>
              <td>분야</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" value={0} checked={props.field[0]} onChange={(event) => handleFieldChange(event)} />환경/에너지</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={1} checked={props.field[1]} onChange={(event) => handleFieldChange(event)} />콘텐츠/웹툰</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={2} checked={props.field[2]} onChange={(event) => handleFieldChange(event)} />취업/창업</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={3} checked={props.field[3]} onChange={(event) => handleFieldChange(event)} />음악/예술</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={4} checked={props.field[4]} onChange={(event) => handleFieldChange(event)} />연구/학술/논문</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={5} checked={props.field[5]} onChange={(event) => handleFieldChange(event)} />아이디어/기획</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={6} checked={props.field[6]} onChange={(event) => handleFieldChange(event)} />사진/영상/UCC</td>
                    </tr>
                    <tr><td><input type="checkbox" value={7} checked={props.field[7]} onChange={(event) => handleFieldChange(event)} />문화/영화/문학</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={8} checked={props.field[8]} onChange={(event) => handleFieldChange(event)} />디자인/미술</td>
                    </tr>
                    <tr><td><input type="checkbox" value={9} checked={props.field[9]} onChange={(event) => handleFieldChange(event)} />네이밍/슬로건</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={10} checked={props.field[10]} onChange={(event) => handleFieldChange(event)} />금융/경제/경영</td>
                    </tr>
                    <tr><td><input type="checkbox" value={11} checked={props.field[11]} onChange={(event) => handleFieldChange(event)} />과학/공학/IT</td>
                    </tr>
                    <tr>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>대상</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" value={0} checked={props.target[0]} onChange={(event) => handleTargetChange(event)} />누구나지원</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={1} checked={props.target[1]} onChange={(event) => handleTargetChange(event)} />청소년</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={2} checked={props.target[2]} onChange={(event) => handleTargetChange(event)} />대학(원)생</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={3} checked={props.target[3]} onChange={(event) => handleTargetChange(event)} />취준생</td>
                    </tr>
                    <tr>
                      <td><input type="checkbox" value={4} checked={props.target[4]} onChange={(event) => handleTargetChange(event)} />직장인</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </MenuList>
    </Paper>
  );
}