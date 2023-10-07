

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


export const visitSetStorage = () => {
  // 방문 정보 객체 생성
  const obj = {
    value: true,
    expire: Date.now() + 3600000 // 1시간 설정
  }

  // 로컬 스토리지에 방문 정보 저장 (JSON 형식으로 변환)
  window.localStorage.setItem('visit', JSON.stringify(obj));
}


export const visitGetStorage = () => {
  // 로컬 스토리지에서 'visit' 값을 가져옴
  const visitLocal = window.localStorage.getItem('visit');

  // 'visit' 값이 없으면 false 반환
  if (!visitLocal) return false;

  // JSON 문자열을 객체로 변환
  const obj = JSON.parse(visitLocal);

  // 현재 시간이 만료 시간을 지났으면 로컬 스토리지에서 'visit' 제거하고 false 반환
  if (Date.now() > obj.expire) {
    window.localStorage.removeItem('visit');
    return false;
  } else {
    return true; // 그렇지 않으면 true 반환
  }
}
