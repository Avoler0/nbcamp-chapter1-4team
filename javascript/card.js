

export const memberCard = (data, id) => {
  if (!data) {
    alert('페이지 이동이 너무 빠릅니다.');
    window.location.reload();
  }

  const { name, hobby, collaboStyle, image, good, blog, selfIntro } = data;

  const cardHtml = `
    <div id="card" data-member-id="${id}">
      <section class="crac">
        <img
          src="${image}"
          alt=""
          srcset=""
          class="person_img"
        />
        <div class="person_intro">
          <div>
            <p class="intro_q">이름</p>
            <p class="intro_a">${name}</p>
          </div>
          <div>
            <p class="intro_q">취미</p>
            <p class="intro_a">${hobby}</p>
          </div>
          <div>
            <p class="intro_q">협업 스타일</p>
            <p class="intro_a">${collaboStyle}</p>
          </div>
          <div>
            <p class="intro_q">블로그</p>
            <p class="intro_a">
              <a href="${blog}" target="_blank">${blog}</a>
            </p>
          </div>
          <div class="good">
            <button id="goodBtn" class="btn btn-outline-dark">
              👍${good === undefined ? 0 : good}
            </button>  
          </div>
        </div>
      </section>
      <section class="myself_intro">
        <div class="myself_q">자기소개</div>
        <p class="myself_a">${selfIntro}</p>
      </section>
      <div class="story">
        <section class="msg">
          <div class="cheerup_title">응원 메세지</div>
          <div id="commentField"></div>
          <div id="commentForm">
            <div id="input">
              <input type="text" id="commentName" placeholder="이름" />
              <div class="textdiv">
                <textarea id="commentText" placeholder="댓글 내용"></textarea>
                <button id="commentBtn" class="btn btn-outline-dark">등록</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  return cardHtml;
}
