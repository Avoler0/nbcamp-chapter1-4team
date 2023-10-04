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

// // 데이터 추가 스켈레톤
// $("#movie_confirm").click(async function () {
//   let imageUrl = document.querySelectorAll("#floatingTextarea")[0].value;
//   let star = document.getElementById("star").value;
//   let movieTtile = document.querySelectorAll("#floatingTextarea")[1].value;
//   let movieReco = document.querySelectorAll("#floatingTextarea")[2].value;

//   let doc = {
//     image: imageUrl,
//     star: star,
//     title: movieTtile,
//     reco: movieReco,
//   };

//   if (!doc.image || !doc.star || !doc.title || !doc.reco) {
//     alert("빈 칸을 채우세요.");
//   } else {
//     await addDoc(collection(db, "cards"), doc); // 콜렉션 이름에 저장이 된다
//     alert("저장완료");
//     window.location.reload();
//   }
// });

// 데이터 읽기 스켈레톤
let docs = await getDocs(collection(db, "members"));
// $(".crac").empty();
// $(".myself_intro").empty();
docs.forEach((doc) => {
  let row = doc.data();
  let image = row.image;
  let name = row.name;
  let hobby = row.hobby;
  let style = row.style;
  let blog = row.blog;
  let myself_intro = row.myself_intro;
  let temp_html = `
  <div class="container-xl team_modal">
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
        <span class="intro_a">${style}</span>
      </div>
      <div>
        <span class="intro_q">블로그</span>
        <br />
        <span class="intro_a">${blog}/span>
      </div>
    </div>
  </section>
  <section class="myself_intro">
    <div class="myself_q">자기소개</div>
    <p class="myself_a">${myself_intro}</p>
  </section>
  `;
  $(".team_modal").append(temp_html);
});
