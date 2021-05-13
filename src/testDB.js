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
const categoryImage = {
  1: "https://images.unsplash.com/photo-1613567178573-e1ba31966de9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fHBpY3R1cmUlMjB2aWRlb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=60",
  2: "https://images.unsplash.com/photo-1596638787647-904d822d751e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
  3: "https://images.unsplash.com/photo-1538121915146-1dedb4191b21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
  4: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
  5: "https://images.unsplash.com/photo-1491245338813-c6832976196e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
  6: "https://images.unsplash.com/photo-1475906089153-644d9452ce87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
  7: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  8: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
  9: "https://images.unsplash.com/photo-1499571466915-ffc02b27d65e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  10: "https://images.unsplash.com/photo-1535381273077-21e00c27b1b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
  11: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
  12: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"

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
  export { category, bookmarks, cardsinfo, categoryImage};