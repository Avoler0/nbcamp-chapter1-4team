import { navSelectMember, memberCardInsert, navItemInit } from "./member.js";
import { getComment } from "./comment.js";
import {db} from './firebase.js';
import {
  doc,
  collection,
  deleteDoc,
  addDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

$("#addMemberBtn").click(async function () {
  // 멤버 추가 버튼 클릭 시 실행

  // 입력된 값들을 변수에 저장합니다.
  let image = $("#image").val();
  let name = $("#name").val();
  let blog = $("#blog").val();
  let hobby = $("#hobby").val();
  let collaboStyle = $("#collaboStyle").val();
  let selfIntro = $("#selfIntro").val();

  // 멤버 정보를 객체로 정리합니다.
  let doc = {
    image: image,
    name: name,
    hobby: hobby,
    blog: blog,
    collaboStyle: collaboStyle,
    selfIntro: selfIntro,
    good: 0
  };

  // 필수 정보를 입력하지 않은 경우 알림을 띄우고 종료합니다.
  if (image === "" || name === "" || hobby === "" || collaboStyle === "" || blog === "" || selfIntro === "") {
    alert("모든 정보를 입력해 주세요!");
    return;
  }

  try {
    // Firestore에 멤버 추가
    await addDoc(collection(db, "members"), doc);

    // 알림 띄우기
    alert("등록 완료!");

    // 모달 닫기
    $("#addMemberBtn").modal("hide");

    // 페이지 새로고침
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
});


$(document).on("click", ".commentBtn.delteBtn", async (event) => {
  event.preventDefault();

  // 댓글의 id를 가져옵니다.
  const id = event.target.parentElement.parentElement.parentElement.getAttribute("data-comment-id");

  // 삭제 비밀번호를 입력 받습니다.
  const pw = prompt("삭제 비밀번호를 입력해주세요.");

  if (pw) {
    try {
      // 해당 id를 가진 댓글의 정보를 가져옵니다.
      const result = await getDoc(doc(db, "comments", id));
      const { password } = result.data();

      if (password === pw) {
        // 비밀번호가 일치하면 댓글을 삭제합니다.
        await deleteDoc(doc(db, "comments", id));
        alert("삭제완료");
        window.location.reload(); // 페이지를 새로고침합니다.
      } else {
        alert('삭제 비밀번호가 일치하지 않습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  } else if(pw !== null) { // 확인을 누를 시 비밀번호가 없을 경우
    alert('비밀번호를 입력해주세요.');
  }
});


$("nav #navbar").on("click", "#memberNavBtn", async (element) => {
  // 네비게이션에서 이름을 클릭했을 때 실행되는 부분

  // 모든 nav-item에서 _on 클래스를 제거합니다.
  $("nav .nav-item").removeClass("_on");

  // 클릭한 요소의 부모 요소 중 가장 가까운 .nav-item에 _on 클래스를 추가합니다.
  $(element.target).closest(".nav-item").addClass("_on");

  // 클릭한 요소의 data-member-id 속성 값을 가져옵니다.
  const dataMemberId = element.currentTarget.getAttribute("data-member-id");

  // 클릭한 멤버의 정보를 데이터베이스에서 가져옵니다.
  const selectUserData = await navSelectMember(dataMemberId);

  // 가져온 멤버 정보와 data-member-id를 파라미터로 사용하여 회원 카드를 삽입합니다.
  memberCardInsert(selectUserData, dataMemberId);
});


$("#memberCard").on("click", "#commentForm button", async () => {
  // 댓글 추가 / 댓글 등록 버튼 클릭 시 실행

  const dataMemberId = $('#card').data('member-id'); // 카드에 저장된 멤버 아이디 가져오기

  // 삭제 비밀번호를 입력 받습니다.
  let pw = prompt('삭제 비밀번호를 입력해주세요.');

  const data = {
    memberId: dataMemberId, // 멤버 필드 아이디
    commentName: $("#commentName").val(), // 댓글 닉네임 input value
    commentText: $("#commentText").val(), // 댓글 내용 input value
    date: new Date().getTime(), // 현재 시간 밀리세컨드
    password: pw // 삭제 비밀번호
  };

  if (data.commentName.length <= 0 || data.commentText.length <= 0) {
    return alert('내용을 입력해주세요.');
  } // 이름 또는 댓글 내용이 아무것도 없을 때 경고창

  if (pw.length >= 4) { // 비밀번호가 4자리 이상일 때 실행
    try {
      // Firestore에 댓글 추가
      await addDoc(collection(db, "comments"), data);

      // 해당 멤버의 댓글을 다시 가져와 화면에 출력
      await getComment(dataMemberId);
    } finally {
      // 입력 필드 초기화
      $("#commentName").val('');
      $("#commentText").val('');
    }
  } else {
    alert('비밀번호를 4자리 이상 입력해주세요.');
  }
});


$("#memberCard").on("click", ".good #goodBtn", async () => {
  // 좋아요 버튼 클릭 시 실행

  // 카드에 저장된 멤버 아이디 가져오기
  const dataMemberId = $('#card').data('member-id');
  
  // 좋아요 버튼의 상태를 localStorage에서 가져옵니다.
  const goodSwitch = window.localStorage.getItem('goodBtn');

  // 이미 좋아요를 눌렀을 경우 알림을 띄우고 종료합니다.
  if (goodSwitch) return alert('이미 좋아요를 누르셨습니다.');

  try {
    // 해당 멤버의 데이터를 가져옵니다.
    const memberData = await getDoc(doc(db, "members", dataMemberId));
    const { good } = memberData.data();

    // 좋아요 수를 1 증가시키고 업데이트합니다.
    await updateDoc(doc(db, "members", dataMemberId), {
      good: good + 1,
    });

    const goodPlus = good + 1;
    // 좋아요 버튼의 텍스트를 업데이트합니다.
    $("#goodBtn").html(`👍${goodPlus}`);

    // localStorage에 좋아요 버튼 상태를 저장합니다.
    window.localStorage.setItem('goodBtn', true);
  } catch (err) {
    console.log(err);
  }
});



  $(document).on("click", ".commentHideBtn", function () {
    $("#commentField").toggle();
  });