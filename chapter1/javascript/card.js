

export const memberCard = (data,id) => {
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
                <span class="intro_q">이름</span>
                <br />
                <span class="intro_a">${name}</span>
              </div>
              <div>
                <span class="intro_q">취미</span>
                <br />
                <span class="intro_a">${hobby}</span>
              </div>
              <div>
                <span class="intro_q">협업 스타일</span>
                <br />
                <span class="intro_a">${collaboStyle}</span>
              </div>
              <div>
                <span class="intro_q">블로그</span>
                <br />
                <span class="intro_a"><a href="${blog}" target="_blank">${blog}</a></span>
              </div>
              <div class="good">
                <button id="goodBtn">👍${good === undefined ? 0 : good}</button>
              </div>
            </section>
            <section class="myself_intro">
              <div class="myself_q">자기소개</div>
              <p class="myself_a">${selfIntro}</p>
            </section>
            <div class="story">
            <section class="msg">

              <div class="cheerup_title">응원 메세지<button class="commentHideBtn"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg></button></div>
              <div id="commentField">
              </div>
              <div id="commentForm">
                <div id="input">
                  <input type="text" id="commentName" placeholder="이름" />
                  <div class="textdiv">
                    <textarea id="commentText" placeholder="댓글 내용"/>
                    <button id="commentBtn">등록</button>
                  </div>
                </div>

              </div>
          </section>
        </div>
          </div>
          `;

  return cardHtml
}