

// Firebase SDK 라이브러리 가져오기
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
    import { doc, collection, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
    import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

    // Firebase 구성 정보 설정
    

    // Firebase 인스턴스 초기화
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    let members = [];
    let tempMembers;

    const getMembers = async () => {
      try {
        let docs = await getDocs(collection(db, "members"));

        docs.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();

          members.push({ id, data })

          let temp_html = `
            <img src="${data.image}" />
            <div>
              <span>이름</span>
              <span>${data.name}</span>
            </div>
            <div>
              <span>취미</span>
              <span>${data.hobby}</span>
            </div>
            <div>
              <span>협업 스타일</span>
              <span>${data.collaboStyle}</span>
            </div>
            <div>
              <span>자기소개</span>
              <span>${data.selfIntro}</span>
            </div>
            <div>
              <button onclick="">추천</button>
            </div>
          `

          $('#memberCards').append(temp_html)
        });
      } catch (err) {
        alert('데이터 불러오기 실패')
      }
    }

    const makeMembersCard = () => {
      
    }
  await getMembers();

  $('#test').click(async ()=> {

    let doc = {
      image:'hihi',
      name:'정윤서',
      hobby:'노래',
      collaboStyle:'소통을 중요시 합니다.',
      blog:'http:localhost:5173',
      selfIntro:'안녕하세요 4조 팀장 정윤서입니다.',
      good:0
    }

    await addDoc(collection(db,"members"), doc);

    console.log('실행')
  })
  $('#test2').click(async () => {

    // let docs = await getDocs(collection(db, "members"));

    // docs.forEach((doc) => {
    //   const id = doc.id;
    //   const data = doc.data();

    //   members.push({id,data})
    // }); 
    console.log('실행', tempMembers,members)
  })
  $('#test3').click(async () => {
    console.log(tempMembers,members);
    try{
      let docs = await updateDoc(doc(db, "members", 'DukIKijuszU2aoDRaZhR'), {
        good: +1
      });
      console.log(docs)
    }catch(err){
      console.log(err)
    }finally{
      console.log('end')
    }
  })