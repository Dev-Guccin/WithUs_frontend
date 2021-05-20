import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import axios from 'axios';
import { Route, BrowserRouter as Router } from "react-router-dom";
// import Routes from './components/Routes'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './views/Home'
import Admin from './views/Admin'
import Teammate from './views/Teammate'
import Contestdetail from './views/Contestdetail'
import Teammatedetail from './views/Teammatedetail'
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import TmSidebar from './components/TmSidebar';
import OnlyMyPage from './views/OnlyMyPage';
import ApplicationList from './views/ApplicationList';
import ApplicantsCheck from './views/ApplicantsCheck';
import Mypage from './views/MyPage';
import MyPageSideBar from './components/MyPageSideBar';
import Admin_modify from './views/Admin_modify';
import Interest from './views/Interest';
import createTeam from './views/Teamboard/createTeam';
import updateTeam from './views/Teamboard/updateTeam';
import Quit from './views/Quit';
import TeammateContest from './views/TeammateContest';
import TeammateProject from './views/TeammateProject';
import modifyPassword from './views/modifyPassword';
import MyTeamBoard from './views/MyTeamBoard';
import ContestBookmark from './views/ContestBookmark';
import TeamBookmark from './views/TeamBookmark';

const headers = [
  { title: 'Home', url: '/home' },
  { title: 'Contest', url: '/home' },
  { title: 'Teammate', url: '/teammate' },
  { title: 'Business', url: '#' },
];

function App() {
  const [logincheck, setlogincheck] = useState(localStorage.login_check)
  useEffect(() => {
    console.log("####logint state changed: ", logincheck);
  }, [logincheck])
  
  const [bottompage, setbottompage] = useState(1);//페이지네이션의 페이지 순서 1=> 1~10, 2=> 11~20
  const [represent_sections, setrepresent_sections] = useState([]);
  const [sections, setsections] = useState([]);
  const [page, setpage] = useState(1);//실제 보여질 페이지
  const [sort, setsort] = useState(1);

  useEffect(() => {
    optionSearch()
  }, [page]);

  const [field, setfield] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false
  })
  const [target, settarget] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false, 5: false
  })
  const [keyword, setkeyword] = useState("")
  //옵션에 따라 공모전 데이터 가져오기
  function optionSearch(event) {
    console.log("option search")
    axios.post('http://localhost:3001/contest/options/' + page, {//공모전 데이터 들고오기
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "field": field,
        "target": target,
        "keyword": keyword,
        "sort": sort,
      }
    }).then(response => {
      console.log(response);
      setrepresent_sections(response.data.slice(0, 3));
      setsections(response.data.slice(3));
    })
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg">
          <Header title="WithUs" sections={headers} logincheck={logincheck} setlogincheck={setlogincheck}>
          </Header>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Route path='/' exact={true} render={() => 
                <Sidebar field={field} setfield={setfield} target={target} settarget={settarget}/>} />
              <Route path='/home' exact={true} render={() => 
                <Sidebar field={field} setfield={setfield} target={target} settarget={settarget}/>} />
              <Route path='/Login' exact={true} render={() => 
                  <Sidebar field={field} setfield={setfield} target={target} settarget={settarget}/>} />
              <Route path='/SignUp' exact={true} render={() => 
                <Sidebar field={field} setfield={setfield} target={target} settarget={settarget}/>} />
              <Route path="/teammate" component={TmSidebar}  />
              <Route path='/team-contest' component={TmSidebar} />
              <Route path='/team-project' component={TmSidebar} />
              <Route path="/OnlyMyPage" component={MyPageSideBar} /> {/* 본인 마이페이지 수정 */}
              <Route path="/ApplicationList" component={MyPageSideBar} />
              <Route path="/ApplicantsCheck" component={MyPageSideBar} /> 
              <Route path='/MyPage' exact={true} render={() => 
                <Sidebar field={field} setfield={setfield} target={target} settarget={settarget}/>} />
              <Route path='/Interest' component={MyPageSideBar} />
              <Route path='/Quit' component={MyPageSideBar} />
              <Route path='/MyTeamBoard' component={MyPageSideBar} />
              <Route path='/modifyPassword' component={MyPageSideBar} />
              <Route path='/ContestBookmark' component={MyPageSideBar} />
              <Route path='/TeamBookmark' component={MyPageSideBar} />
            </Grid>
            <Grid item xs={10}>
              <main>
                <Route path='/' exact={true} render={() => 
                  <Home keyword={keyword} setkeyword={setkeyword}
                  represent_sections={represent_sections} sections={sections}
                  optionSearch={optionSearch} setsort={setsort}
                  bottompage={bottompage} setbottompage={setbottompage} setpage={setpage}/>} />
                <Route path='/home' exact={true} render={() => 
                  <Home keyword={keyword} setkeyword={setkeyword}
                  represent_sections={represent_sections} sections={sections}
                  optionSearch={optionSearch} setsort={setsort}
                  bottompage={bottompage} setbottompage={setbottompage} setpage={setpage}/>} />
                <Route path="/Contestdetail/:CB_code" exact={true} component={Contestdetail} />
                <Route path="/Teammatedetail/:TB_code" exact = {true} component={Teammatedetail} />
                <Route path="/teammate" exact={true} render={() => <Teammate randomKey={Math.random()}/>}/>
                <Route path='/Login' exact={true} render={() => <SignIn logincheck={logincheck} />} />
                <Route path="/SignUp" exact={true} component={SignUp} />
                <Route path="/Interest" exact={true} component={Interest} /> {/* 관심사 추가 페이지 */}
                <Route path="/OnlyMyPage" exact={true} component={OnlyMyPage} /> {/* 본인 마이페이지 수정 */}
                <Route path="/ApplicationList" exact={true} component={ApplicationList} /> {/* 본인 마이페이지 수정 */}
                <Route path="/ApplicantsCheck" exact={true} component={ApplicantsCheck} /> {/* 본인 마이페이지 수정 */}
                <Route path="/MyPage" exact={true} component={Mypage} /> {/* 유저들 마이페이지 조회 */}
                <Route path="/Admin" exact={true} component={Admin} />
                <Route path="/Admin_modify/:User_code" exact = {true} component={Admin_modify} />
                <Route path='/createTeam' component={createTeam}/>
                <Route path='/Quit' component={Quit}/>
                <Route path='/modifyPassword' component={modifyPassword}/>
                <Route path='/MyTeamBoard' component={MyTeamBoard}/>
                <Route path='/ContestBookmark' component={ContestBookmark}/>
                <Route path='/TeamBookmark' component={TeamBookmark}/>
                <Route path='/team-contest' render={() => <TeammateContest randomKey={Math.random()}/>}/>
                <Route path='/team-project' render={() => <TeammateProject randomKey={Math.random()}/>}/>
              </main>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
