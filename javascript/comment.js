import {db} from './firebase.js';
import { timeFormat } from './utils.js';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export const getComment = async (memberId) => {
  const q = query(
    collection(db, "comments"),
    where("memberId", "==", memberId),
  );
  const querySnapshot = await getDocs(q);

  const comments = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      data: doc.data(),
    };
  });

  comments.sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());

  const html = comments.map((comment) => `
    <div class="result_msg" data-comment-id='${comment.id}'>
      <span class="result_name">${comment.data.commentName}</span>
      <span class="result_detail">${comment.data.commentText}</span>
      
      <div class="resultBottom">
        <span class="result_date">${timeFormat(comment.data.date)}</span>
        <div>
          <button class="commentBtn updateBtn">수정</button>
          <button class="commentBtn delteBtn">삭제</button>
        </div>
      </div>
    </div>
  `).join("");

  $("#commentField").empty().append(html);
};
