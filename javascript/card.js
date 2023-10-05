

export const memberCard = (data,id) => {
  const { name, hobby, collaboStyle, image, good, blog, selfIntro } = data;

  const cardHtml = `
            <div id="card">
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
                <p class="intro_a"><a href="${blog}" target="_blank">${blog}</a></p>
              </div>
              <div class="good">

                <button id="goodBtn" class="btn btn-outline-dark">👍${
                  good === undefined ? 0 : good
                }</button>  
                <button id="goodBtn" class="btn btn-outline-dark">👍${good === undefined ? 0 : good}</button>  
              </div>
            </section>
            <section class="myself_intro">
              <div class="myself_q">자기소개</div>
              <p class="myself_a">${selfIntro}</p>
            </section>
            <div class="story">
            <section class="msg">
              <div class="cheerup_title">응원 메세지</div>
              <div id="commentField">
              </div>
              <div id="commentForm">
                <div id="input">
                  <input type="text" id="commentName" placeholder="이름" />
                  <div class="textdiv">
                    <textarea id="commentText" placeholder="댓글 내용"/>
                    <button id="commentBtn" class="btn btn-outline-dark">등록</button>
                  </div>
                </div>
                
              </div>
          </section>
          </div>
          </div>
          `;

  return cardHtml
}