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
    let firstMember = "";
    let firstId = "";
    let docs = await getDocs(collection(db, "members"));
    let goodKingMember = {
      id: '',
      name: '',
      good: 0
    };

    docs.forEach((doc) => {
      const data = doc.data();
      
      if (firstMember === "") {
        firstMember = data
        firstId = doc.id
      };

      if (data.good > goodKingMember.good) {
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

    // $("nav .nav-item p").on("click", function () {
    //   $("nav .nav-item").removeClass("_on");
    //   $(this).closest(".nav-item").addClass("_on");
    // });
  };
  navItemInit();

export const navSelectMember = async (clickMemberId) => {
  let memberDoc  = await getDoc(doc(db,'members',clickMemberId));

  return memberDoc.data();
};

export const memberCardInsert = (data, id) => {
  const cardHtml = memberCard(data,id);
  getComment(id);
  $("#memberCard").children().remove();
  $("#memberCard").append(cardHtml);
};