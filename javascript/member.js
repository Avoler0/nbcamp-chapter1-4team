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
console.log('멤버JS 실행')

const navItemInit = async () => {
    console.log('네브 아이템 인잇')
    let firstMember = "";
    let firstId = "";
    let docs = await getDocs(collection(db, "members"));
    let goodKingMember = {
      id: '',
      name: '',
      good: 0
    };
    // console.log(docs.data().count)
    docs.forEach((doc) => {
      const data = doc.data();
      console.log(data.count)
      if (firstMember === "") {
        firstMember = data
        firstId = doc.id
      };

      if (data.good >= goodKingMember.good) {
        goodKingMember.id = doc.id;
        goodKingMember.name = data.name;
        goodKingMember.good = data.good;
      }

      const html = `
      <li class="nav-item">
        <p id="memberNavBtn" data-member-id="${doc.id}">
          <span>${data.name}</span>
          ${goodKingMember.name === data.name ? '<span class="goodman">인기👑</span>' : ''}
        </p>
      </li>
      `;
      memberCardInsert(firstMember, firstId);

      $("#navbar").append(html);
    });

    $("nav .nav-item:first-child").addClass("_on");

    $("nav .nav-item p").on("click", function () {
      $("nav .nav-item").removeClass("_on");
      $(this).closest(".nav-item").addClass("_on");
    });
  };
  navItemInit();

export const navSelectMember = async (clickName) => {
  console.log('네브 셀렉트 멤버')
  let docs = await getDocs(collection(db, "members"));
  let selectUserData;
  docs.forEach((doc) => {
    const { name } = doc.data();

    if (name === clickName) {
      selectUserData = doc.data();
      return;
    }
  });

  return selectUserData;
};

export const memberCardInsert = (data, id) => {
  console.log('멤버 카드 인설트')
  const cardHtml = memberCard(data,id);
  getComment(id);
  $("#memberCard").children().remove();
  $("#memberCard").append(cardHtml);
};