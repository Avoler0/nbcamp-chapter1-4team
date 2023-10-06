import { navSelectMember, memberCardInsert } from "./member.js";
import { getComment } from "./comment.js";
import {db,app} from './firebase.js';
import {
  doc,
  collection,
  deleteDoc,
  addDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

$("#addMemberBtn").click(async function () { // 멤버 추가 
  let image = $("#image").val();
  let name = $("#name").val();
  let blog = $("#blog").val();
  let hobby = $("#hobby").val();
  let collaboStyle = $("#collaboStyle").val();
  let selfIntro = $("#selfIntro").val();

  let doc = {
    image: image,
    name: name,
    hobby: hobby,
    blog: blog,
    collaboStyle: collaboStyle,
    selfIntro: selfIntro,
    good:0
  };

  if (image === "") {
    alert("이미지 주소를 입력해 주세요!");
    return;
  }
  if (name === "") {
    alert("이름을 입력해 주세요!");
    return;
  }
  if (hobby === "") {
    alert("취미를 입력해 주세요!");
    return;
  }
  if (collaboStyle === "") {
    alert("협업 스타일을 입력해 주세요!");
    return;
  }
  if (blog === "") {
    alert("블로그 주소를 입력해 주세요!");
    return;
  }
  if (selfIntro === "") {
    alert("자기 소개를 입력해 주세요!");
    return;
  }

  await addDoc(collection(db, "members"), doc);
  alert("등록 완료!");
  $("#addMemberBtn").modal("hide");

  //새로고침
  window.location.reload();
});

$(document).on("click", ".commentDeleteBtn", async (event) => {
  event.preventDefault();
  const id = event.target.parentElement.parentElement.getAttribute("data-comment-id");
  const ok = window.confirm("삭제");
  if (ok) {
    try {
      await deleteDoc(doc(db, "comments", id));
      alert("삭제완료");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
});

$("nav #navbar").on("click", "#memberNavBtn", async (element) => { // 네비게이션 이름 클릭
  const dataMemberId = element.currentTarget.getAttribute("data-member-id"); 
  // 클릭한 사람의 멤버 문서 ID 데이터를 가져옴 - 요소에 data-member-id
  const selectUserData = await navSelectMember(element.target.innerText); 
  // navSelectmember함수에 클릭한 사람의 이름을 전달 , return값은 데이터 베이스의 members 안에 저장된 유저 데이터
  memberCardInsert(selectUserData, dataMemberId); 
  // 리턴 받은 유저 데이터와, 가져온 사람의 memberId를 parameter로 전달
});

$("#memberCard").on("click", "#commentForm button", async () => { // 댓글 추가 / 댓글 등록 버튼 클릭
    const dataMemberId = $('#card').data('member-id');
    // 
    const data = {
      memberId: dataMemberId, // 멤버 필드 아이디
      commentName: $("#commentName").val(),
      commentText: $("#commentText").val(),
      date: new Date().getTime(),
    };

    if(data.commentName <= 0 || data.commentText <= 0){
      return alert('내용을 입력해주세요.')
    }
    try {
      await addDoc(collection(db, "comments"), data);

      await getComment(dataMemberId);
    } catch (err) {
      console.log("댓글 추가 에러", err);
    }finally{
      $("#commentName").val('')
      $("#commentText").val('')
    }
  });

  $("#memberCard").on("click", ".good #goodBtn", async () => {
    // 좋아요 클릭
    const dataMemberId = $('#card').data('member-id');
    const goodSwitch = window.localStorage.getItem('good');
    
    if(goodSwitch) return alert('이미 좋아요를 누르셨습니다.');

    try {
      const memberData = await getDoc(doc(db, "members", dataMemberId));
      const { good } = memberData.data();

      await updateDoc(doc(db, "members", dataMemberId), {
        good: good + 1,
      });

      const goodPlus = good + 1;
      $("#goodBtn").html(`👍${goodPlus}`);

      window.localStorage.setItem('good',true);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("end");
    }
  });

  $(document).on("click", ".commentHideBtn", function () {
    $("#commentField").toggle();
  });