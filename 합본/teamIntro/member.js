// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyDspAV1LiugBcx69J0dWIk979EKColRCMY",
  authDomain: "nbcamp4dollar.firebaseapp.com",
  projectId: "nbcamp4dollar",
  storageBucket: "nbcamp4dollar.appspot.com",
  messagingSenderId: "903810170431",
  appId: "1:903810170431:web:d06256df539d9edb0e828a",
  measurementId: "G-LBRL46HQYD",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 읽기 스켈레톤
// 캐릭터 특징, 자기소개 데이터 받아오고, comment.js에서 댓글 받아와 보여줌.
let docs = await getDocs(collection(db, "members"));
$(".container").empty();
$(".myself_intro").empty();
$(".story").empty();
docs.forEach((doc) => {
  let row = doc.data();
  let image = row.image;
  let name = row.name;
  let good = row.good;
  let hobby = row.hobby;
  let collaboStyle = row.collaboStyle;
  let blog = row.blog;
  let selfIntro = row.selfIntro;
  let temp_html = `
  <section class="crac">
    <img
      src="${image}"
      alt=""
      srcset=""
      class="person_img"
    />
    <div class="person_intro">
      <div>
        <span class="intro_q">이름</span>
        <br />
        <span class="intro_a">${name}</span>
      </div>
      <div>
        <span class="intro_q">취미</span>
        <br />
        <span class="intro_a">${hobby}</span>
      </div>
      <div>
        <span class="intro_q">협업 스타일</span>
        <br />
        <span class="intro_a">${collaboStyle}</span>
      </div>
      <div>
        <span class="intro_q">블로그</span>
        <br />
        <span class="intro_a"><a href="#">${blog}</a></span>
      </div>
      <span class="good">👍${good}</span>
      </section>
  <section class="myself_intro">
    <div class="myself_q">자기소개</div>
    <p class="myself_a">${selfIntro}</p>
  </section>
  <section class="msg">
  <div class="cheerup_title">응원 메세지</div>
  <div class="story">
  </div>
  </section>
  `;
  $(".container").append(temp_html);
});
