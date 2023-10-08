import { weekday } from "./utils.js";
import { db } from './firebase.js';
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getVisitData } from "./visit.js";

try {
  // 방문자 데이터 가져오기
  let result;
  let data;
  let config;

  setTimeout(async () => {
    result = await getVisitData();
    // 현재 요일 가져오기
    let today = new Date().getDay();
    let dataArr = [];
    let labelArr = [];

    // 현재 요일을 배열의 4번째로 이동
    weekday.forEach((day, index) => {
      let newIndex = (index + (3 - today) + 7) % 7; // 새로운 인덱스 계산
      dataArr[newIndex] = result[index]; // 새로운 인덱스에 해당하는 방문자 수 대입
    });

    weekday.forEach((day, index) => {
      let newIndex = (index + (3 - today) + 7) % 7;
      labelArr[newIndex] = day;
    });

    // 그래프 데이터 설정
    data = {
      labels: labelArr,
      datasets: [{
        label: '방문자 수',
        data: dataArr,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };

    // 그래프 설정
    config = {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false, // 라벨 표시 안함
          }
        },
        scales: {
          y: {
            ticks: {
              // y축 tick 수정
              callback: function(value, index, ticks) {
                return Number.isInteger(value) ? index % 2 === 0 ? value + '명' : '' : '';
              }
            }
          }
        },
        responsive: false,
      }
    };
    // 그래프를 그릴 요소 가져오기
    const ctx = document.getElementById('visitChart');

    // 그래프 생성
    new Chart(ctx, config);
  }, 1000);
} catch (err) {
  console.log(err);
}
