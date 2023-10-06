import {db} from './firebase.js';
import {
  updateDoc,
  getDoc,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { visitGetStorage,visitSetStorage } from './utils.js';

const getClientIp = async() => {
    try{
      const response = await axios.get("https://geolocation-db.com/json/");
      const { IPv4 } = response.data;
      let visitDoc  = await getDoc(doc(db,'visitants',IPv4));
      const {visit} = visitDoc.data()

      if(visitGetStorage()) return;

      visitSetStorage();
      if(visitDoc.data()){
        await updateDoc(doc(db, "visitants", IPv4), {
          visit: visit + 1,
        });
      }else{
        await setDoc(doc(db, "visitants", IPv4), {
          visit:1
        });
      }
    }catch(err){
      console.log(err)
    }
  }

  getClientIp()