import logo from './logo.svg';
import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import './App.css';
import axios from 'axios';

function App() {
  const [test, settest ] = useState();
  
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    axios.get('http://localhost:3001/test',{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response)
      settest(response.data)
    });
    });  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {test}
        </p>
      </header>
    </div>
  );
}

export default App;
