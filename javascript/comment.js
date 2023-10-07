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
  // 해당 memberId의 댓글을 가져오는 쿼리 생성
  const q = query(
    collection(db, "comments"),
    where("memberId", "==", memberId),
  );

  // 쿼리 실행
  const querySnapshot = await getDocs(q);

  // 쿼리 결과를 배열로 변환
  const comments = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      data: doc.data(),
    };
  });

  // 댓글을 날짜순으로 정렬
  comments.sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());

  // HTML 생성
  const html = comments.map((comment) => `
    <div class="result_msg" data-comment-id='${comment.id}'>
      <span class="result_name">${comment.data.commentName}</span>
      <span class="result_detail">${comment.data.commentText}</span>
      <div class="resultBottom">
        <span class="result_date">${timeFormat(comment.data.date)}</span>
        <div>
          <button class="commentBtn delteBtn btn btn-outline-dark">삭제</button>
        </div>
      </div>
    </div>
  `).join("");

  // 댓글을 표시할 요소를 비우고 생성된 HTML을 추가합니다.
  $("#commentField").empty().append(html);
};
