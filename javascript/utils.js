

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