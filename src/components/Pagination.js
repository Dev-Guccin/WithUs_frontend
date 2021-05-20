import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!

export default function Pagination(props) {
  const [pagearray, setpagearray] = useState([]);//실제 보여질 페이지
  useEffect(() => {
    setArray()
  }, [props.bottompage]);
  function setArray(){
    console.log("pagenum",props.bottompage);
    var array = [];
    for (var i = 1 + (props.bottompage - 1) * 10; i <= 10 * props.bottompage; i++) {
      //어레이에 번호 넣어줌
      array.push(i)
    }
    setpagearray(array)
  }
  function changePage(page) {
    console.log(page)
    props.setpage(parseInt(page))
    window.scrollTo(0, 0)
  }
  function changebottomPage(direction){
    console.log(props.bottompage)
    if(direction == 0){//이전
      if(props.bottompage != 1){
        props.setbottompage(props.bottompage-1);
        setArray();
      }
    }else{//다음
      props.setbottompage(props.bottompage+1);
      setArray();
    }
  }
  return (
    <div className="">
      <button onClick={()=>changebottomPage(0)}>{"<"}</button>
      {pagearray.map((page) => (
          <button key={page} onClick={()=>changePage(page)}>{page}</button>
        ))}
      <button onClick={()=>changebottomPage(1)}>{">"}</button>
    </div>
  );
}