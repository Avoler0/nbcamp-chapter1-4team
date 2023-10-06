

export const timeFormat = (time) => {
  const timeDate = new Date(time);
  const year = timeDate.getFullYear();
  const month = timeDate.getMonth() + 1;
  const date = timeDate.getDate();
  const hours = timeDate.getHours();
  const minute = timeDate.getMinutes();
  const seconds = timeDate.getSeconds();

  return `${year}년 ${month}월 ${date}일 ${hours}시 ${minute}분 ${seconds}초`
}

export const visitSetStorage = () => {
  const obj = {
    value:true,
    expire:Date.now() + 3600000 // 1시간 설정
  }

  window.localStorage.setItem('visit',JSON.stringify(obj))
}

export const visitGetStorage = () => {
  const visitLocal = window.localStorage.getItem('visit');

  if(!visitLocal) return false;

  const obj = JSON.parse(visitLocal);

  if(Date.now() > obj.expire){
    window.localStorage.removeItem('visit');
    return false;
  }else{
    return true;
  }
}