import {db} from './firebase.js';
import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export const getComment = async (memberId) => {
    console.log("겟 코멘트");
    const q = query(
      collection(db, "comments"),
      where("memberId", "==", memberId)
    );
    const docs = await getDocs(q);
    let sort = [];
    let html = "";

    docs.forEach((doc) => {
      sort.push(doc.data());
    });

    sort.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sort.forEach((doc) => {
      let temp_html = `
              <div class="result_msg">
                <span class="result_name">${doc.commentName}</span>
                <span class="result_detail">${doc.commentText}</span>
              </div>
            `;
      html += temp_html;
    });
    $("#commentField").html("");
    $("#commentField").append(html);
  };