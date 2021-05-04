//test category
const category ={
    1: "사진/영상/UCC",
    2: "콘텐츠/웹툰",
    3: "아이디어/기획",
    4: "취업/창업",
    5: "디자인/미술",
    6: "과학/공학/IT",
    7: "음악/예술",
    8: "금융/경제/경영",
    9: "환경/에너지",
    10: "네이밍/슬로건",
    11: "문화/영화/문학",
    12: "연구/학술/논문"
  }
  //test bookmark
  let bookmarks = {
    1: [3],
    2: [],
    3: []
  }
  
  //test db
  const cardsinfo =[
    {
      "TB_code": 1,
      "User_code": 1,
      "CT_code": 2,
      "TB_title": "공모전 제목1 공모전 제목1 공모전 제목1 공모전 제목1 공모전 제목1 공모전 제목1",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 1,
      "TB_finalNumber": 4,
      "TB_createDate": "2021-05-04" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 2,
      "User_code": 2,
      "CT_code": 1,
      "TB_title": "공모전 제목2 공모전 제목2 공모전 제목2 공모전 제목2 공모전 제목2 공모전 제목2",
      "TB_content": "공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2 공모전 내용2",
      "TB_recruitNumber": 2,
      "TB_finalNumber": 5,
      "TB_createDate": "2021-05-03" ,
      "TB_finalDate" : "2021-05-22"
    },
    {
      "TB_code": 3,
      "User_code": 3,
      "CT_code": 6,
      "TB_title": "공모전 제목3 공모전 제목3 공모전 제목3",
      "TB_content": "공모전 내용3 공모전 내용3 공모전 내용3 공모전 내용3",
      "TB_recruitNumber": 3,
      "TB_finalNumber": 4,
      "TB_createDate": "2021-05-02" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 4,
      "User_code": 4,
      "CT_code": 6,
      "TB_title": "공모전 제목1 공모전 제목1 공모전 제목1",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 1,
      "TB_finalNumber": 5,
      "TB_createDate": "2021-05-01" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 5,
      "User_code": 5,
      "CT_code": 7,
      "TB_title": "공모전 제목1 공모전 제목1 공모전 제목1",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 1,
      "TB_finalNumber": 6,
      "TB_createDate": "2021-04-30" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 6,
      "User_code": 6,
      "CT_code": 8,
      "TB_title": "공모전 제목6 공모전 제목6 공모전 제목6",
      "TB_content": "공모전 내용6 공모전 내용6 공모전 내용6 공모전 내용6",
      "TB_recruitNumber": 2,
      "TB_finalNumber": 6,
      "TB_createDate": "2021-04-29" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 7,
      "User_code": 7,
      "CT_code": 2,
      "TB_title": "공모전 제목1 공모전 제목1 공모전 제목1",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 1,
      "TB_finalNumber": 4,
      "TB_createDate": "2021-04-28" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 8,
      "User_code": 8,
      "CT_code": 2,
      "TB_title": "공모전 제목8 888888881",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 1,
      "TB_finalNumber": 4,
      "TB_createDate": "2021-04-27" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 9,
      "User_code": 9,
      "CT_code": 2,
      "TB_title": "공모전 제목9 공모전 제목9 공모전 제목9",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 5,
      "TB_finalNumber": 10,
      "TB_createDate": "2021-04-22" ,
      "TB_finalDate" : "2021-05-21"
    },
    {
      "TB_code": 10,
      "User_code": 10,
      "CT_code": 10,
      "TB_title": "공모전 제목10 공모전 제목10 공모전 제목10",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 1,
      "TB_finalNumber": 4,
      "TB_createDate": "2021-04-11" ,
      "TB_finalDate" : "2021-05-21"
    },
   
    {
      "TB_code": 11,
      "User_code": 10,
      "CT_code": 10,
      "TB_title": "공모전 제목10 공모전 제목10 공모전 제목10",
      "TB_content": "공모전 내용1 공모전 내용1 공모전 내용1 공모전 내용1",
      "TB_recruitNumber": 1,
      "TB_finalNumber": 4,
      "TB_createDate": "2021-04-11" ,
      "TB_finalDate" : "2021-05-21"
    },
   
  ]
  export { category, bookmarks, cardsinfo };