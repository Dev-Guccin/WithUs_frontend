import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
   

}));

export default function Admin_modify({ match, props }) {
    const classes = useStyles();
    const [section, setsection] = useState([]);

    const [User_id, setUser_id] = useState("");
    const [User_name, setUser_name] = useState("");
    const [User_nickname, setUser_nickname] = useState("");
    const [User_university, setUser_university] = useState("");
    const [User_gender, setUser_gender] = useState("");
    const [User_phone, setUser_phone] = useState("");
    const [User_major, setUser_major] = useState("");
    const [User_area, setUser_area] = useState("");

    const onIdHandler = (event) => {setUser_id(event.currentTarget.value);}
    const onNameHandler = (event) => {setUser_name(event.currentTarget.value);}
    const onNicknameHandler = (event) => {setUser_nickname(event.currentTarget.value);}
    const onUniversityHandler = (event) => {setUser_university(event.currentTarget.value);}
    const onGenderHandler = (event) => {setUser_gender(event.currentTarget.value);}
    const onPhoneHandler = (event) => {setUser_phone(event.currentTarget.value);}
    const onMajorHandler = (event) => {setUser_major(event.currentTarget.value);}
    const onAreaHandler = (event) => {setUser_area(event.currentTarget.value);}
    
    /* 회원정보 수정 버튼을 눌렀을 때의 이벤트 핸들러 */
    const onSubmitHandler = (event) => {
      event.preventDefault();
      var body = {
        User_id : User_id,
        User_name : User_name,
        User_nickname : User_nickname,
        User_university : User_university,
        User_gender : User_gender,
        User_phone : User_phone,
        User_major : User_major,
        User_area : User_area
      }
      console.log(body);
      axios.post('http://'+localStorage.getItem("backend")+':3001/admin/modify_test/'+ match.params.User_code, body)
        .then(response => {
          if(response) {
            alert("정보가 수정되었습니다");
            window.location.href = "http://localhost:3000/admin/";
          } else {
            alert("Signup Error " + response.data.message);
          }
        });
    }

    /* 회원정보 데이터(SELECT) 가져와서 수정페이지의 placeholder에 뿌려준다 */
    useEffect(() => {
      axios.get('http://'+localStorage.getItem("backend")+':3001/admin/modify/' + match.params.User_code, { // 회원 정보 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setsection(response.data[0]);
      })
    }, []);

    return (
        <React.Fragment>
          <main>
            <Container maxWidth="lg">
              <h3>회원정보 수정</h3>
              <Divider/>
              <TableContainer component={Paper}>
              <form onSubmit={onSubmitHandler}>
                <Table>
                    <TableRow>
                      <TableCell>아이디</TableCell>
                      <TableCell>                      
                          <input type="text" placeholder={section.User_id} value={User_id} onChange={onIdHandler} required></input>                          
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>이름</TableCell>
                      <TableCell>
                          <input type="text" placeholder={section.User_name} value={User_name} onChange={onNameHandler} required></input>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>닉네임</TableCell>
                      <TableCell>
                          <input type="text" placeholder={section.User_nickname} value={User_nickname} onChange={onNicknameHandler} required></input>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>대학</TableCell>
                      <TableCell>
                          <input type="text" placeholder={section.User_university} value={User_university} onChange={onUniversityHandler} required></input>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>성별</TableCell>
                      <TableCell>
                          <input type="text" placeholder={section.User_gender} value={User_gender} onChange={onGenderHandler} required></input>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>전화번호</TableCell>
                      <TableCell>
                          <input type="text" placeholder={section.User_phone} value={User_phone} onChange={onPhoneHandler} required></input>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>전공</TableCell>
                      <TableCell>
                          <input type="text" placeholder={section.User_major} value={User_major} onChange={onMajorHandler} required></input>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>지역</TableCell>
                      <TableCell>
                          <input type="text" placeholder={section.User_area} value={User_area} onChange={onAreaHandler} required></input>
                      </TableCell>
                    </TableRow>
                </Table>
                <Button type="submit" variant="contained" color="primary">수정하기</Button>
                </form>
              </TableContainer>
            </Container>
          </main>
        </React.Fragment>
      );
    }
