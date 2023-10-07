import {db,app} from './firebase.js';
import { memberCard } from './card.js';
import { getComment } from './comment.js'

import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export const navItemInit = async () => {
  // 첫 번째 멤버와 아이디 초기화
  let firstMember = "";
  let firstId = "";

  // Firestore에서 멤버 정보 가져오기
  let docs = await getDocs(collection(db, "members"));

  // 좋아요 수가 가장 많은 멤버 초기화
  let goodKingMember = {
    id: '',
    name: '',
    good: 0
  };

  // 각 멤버 정보 처리
  docs.forEach((doc) => {
    const data = doc.data();
    
    // 첫 번째 멤버 정보 설정
    if (firstMember === "") {
      firstMember = data;
      firstId = doc.id;
    }

    // 가장 좋아요가 많은 멤버 업데이트
    if (data.good > goodKingMember.good) {
      goodKingMember.id = doc.id;
      goodKingMember.name = data.name;
      goodKingMember.good = data.good;
    }

    // 네비게이션 바에 멤버 추가
    const html = `
      <li class="nav-item">
        <p id="memberNavBtn" data-member-id="${doc.id}">
          <span>${data.name}</span>
          ${goodKingMember.name === data.name ? '<span class="goodman">인기👑</span>' : ''}
        </p>
      </li>
    `;

    // 첫 번째 멤버 카드 삽입
    memberCardInsert(firstMember, firstId);

    // 네비게이션 바에 멤버 추가
    $("#navbar").append(html);
  });

  // 첫 번째 네비게이션 멤버에 _on 클래스 추가
  $("nav .nav-item:first-child").addClass("_on");

};
navItemInit();

export const navSelectMember = async (clickMemberId) => {
  // 클릭한 멤버의 정보 가져오기
  let memberDoc = await getDoc(doc(db, 'members', clickMemberId));

  return memberDoc.data();
};


export const memberCardInsert = (data, id) => {
  // 멤버 카드 HTML 생성
  const cardHtml = memberCard(data, id);

  // 해당 멤버의 댓글 가져오기
  getComment(id);

  // #memberCard를 비우고 멤버 카드 추가
  $("#memberCard").empty().append(cardHtml);
};
