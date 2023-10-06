import {db} from './firebase.js';
import { timeFormat } from './utils.js';
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
    sort.push({ data: doc.data(), id: doc.id });
  });

  sort.sort(
    (a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
  );

  sort.forEach((doc) => {
    let temp_html = `
              <div class="result_msg" data-comment-id='${doc.id}'>
                <span class="result_name">${doc.data.commentName}</span>
                <span class="result_detail">${doc.data.commentText}</span>
                <div class="resultCommentBtn">
                <button class="commentUpdateBtn">수정</button>
                <button class="commentDeleteBtn">삭제</button>
                </div>
              </div>
            `;
    html += temp_html;
  });
  $("#commentField").html("");
  $("#commentField").append(html);
};