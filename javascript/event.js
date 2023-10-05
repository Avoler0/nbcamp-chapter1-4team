import { navSelectMember, memberCardInsert } from "./member.js";
import { getComment } from "./comment.js";
import {db,app} from './firebase.js';
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

$("nav #navbar").on("click", "#memberNavBtn", async (element) => {
  // 네비게이션 이름 클릭
  const dataMemberId = element.currentTarget.getAttribute("data-member-id");
  const selectUserData = await navSelectMember(element.target.innerText);
  console.log(dataMemberId)
  memberCardInsert(selectUserData, dataMemberId);
});

$("#memberCard").on("click", "#commentForm button", async () => {
    // 댓글 추가
    const dataMemberId = $('#card').data('member-id');
    const data = {
      memberId: dataMemberId, // 멤버 필드 아이디
      commentName: $("#commentName").val(),
      commentText: $("#commentText").val(),
      date: new Date().getTime(),
    };

    console.log(data);
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
      console.log(memberData.data())
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