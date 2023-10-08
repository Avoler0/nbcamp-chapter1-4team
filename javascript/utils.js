

export const weekday = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']


export const timeFormat = (time) => {
  // 입력된 시간을 JavaScript Date 객체로 변환
  const timeDate = new Date(time);

  // 각각의 요소를 추출
  const year = timeDate.getFullYear();
  const month = timeDate.getMonth() + 1;
  const date = timeDate.getDate();
  const hours = timeDate.getHours();
  const minute = timeDate.getMinutes();
  const seconds = timeDate.getSeconds();

  // 포맷된 문자열 반환
  return `${year}년 ${month}월 ${date}일 ${hours}시 ${minute}분 ${seconds}초`;
}




export const visitSetStorage = () => window.localStorage.setItem('visit', timeFormat(new Date()).split(" ",3).join(' '))


export const visitGetStorage = () => {
  // 로컬 스토리지에서 'visit' 값을 가져옴
  const visitLocal = window.localStorage.getItem('visit');


  return visitLocal;
}
