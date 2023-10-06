import {db} from './firebase.js';
import { timeFormat } from './utils.js';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export const getComment = async (memberId) => {
  const q = query(
    collection(db, "comments"),
    where("memberId", "==", memberId),
  );
  const docs = await getDocs(q);
  let html = "";
  let sortArray = [];
  
  docs.forEach((doc) => sortArray.push({ data: doc.data(), id: doc.id }));

  sortArray.sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());

  sortArray.forEach((doc) => {
    let temp_html = `
      <div class="result_msg" data-comment-id='${doc.id}'>
        <span class="result_name">${doc.data.commentName}</span>
        <span class="result_detail">${doc.data.commentText}</span>
        <span class="result_date">${timeFormat(doc.data.date)}</span>
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