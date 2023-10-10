import { db } from './firebase.js';
import {
  updateDoc,
  getDoc,
  setDoc,
  doc,
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { timeFormat, visitGetStorage, visitSetStorage } from './utils.js';

// 현재 시간 포맷팅
let timer; // 타이머 변수
let maxVisit = 0;
const now = timeFormat(new Date()).split(" ", 3).join(' '); // 현재 시간을 포맷팅하여 변수에 저장
// 방문자 데이터 가져오기
export const getVisitData = async () => {
  let docs = await getDocs(collection(db, 'visitants'));
  let dataArr = new Array(7).fill(0);

  docs.forEach((doc) => {
    const { visit } = doc.data();
    const docDay = new Date(doc.id.replace(/\s/g,'.').replace(/년|월|일/g,'')).getDay();
    const nowDay = new Date(now.replace(/\s/g,'.').replace(/년|월|일/g,'')).getDay();
    
    if(visit >= maxVisit) maxVisit = visit;
    
    if(docDay > nowDay){
      return;
    }else{
      
      dataArr[docDay] = visit;
    }
  })


  return {data:dataArr, maxVisit:maxVisit};
}



// 오늘의 방문자 수 가져오기
export const todayVisit = async () => {
  let todayVisitCount = await getDoc(doc(db, 'visitants', now));
  const { visit } = todayVisitCount.data();

  return visit;
}

// 방문자 데이터 가져오기
getVisitData();

// 오늘의 방문자 수 초기화
const todaySetVisitData = async () => {
  await setDoc(doc(db, "visitants", now), {
    visit: 0
  });
}

// 방문자 수 업데이트
export const todayUpdateVisit = async () => {
  const result = await getDoc(doc(db,"visitants", now))
  if(!result.data()) todaySetVisitData();
  visitSetStorage();
  try {
    let visitCount = await todayVisit();
    await updateDoc(doc(db, "visitants", now), {
      visit: visitCount + 1,
    });
    clearTimeout(timer)
  } catch (err) {
    todayUpdateVisit()
  }
}

// 방문 여부 체크 후 방문 기록 저장
if (visitGetStorage() !== now) {
  todayUpdateVisit();
}
