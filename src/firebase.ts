import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 我们需要的是 Firestore

// ↓↓↓ 只需从官网复制下面这个对象 ↓↓↓
const firebaseConfig = {
  apiKey: "AIzaSyADf1UgbPuaZ_s1vCCu5rib4goFHBfiVUs",
  authDomain: "jieyou-e61d3.firebaseapp.com",
  projectId: "jieyou-e61d3",
  storageBucket: "jieyou-e61d3.firebasestorage.app",
  messagingSenderId: "877227555323",
  appId: "1:877227555323:web:4b12608bc6036ea8c2335e",
  measurementId: "G-KRZLV8FNT1" // 这个有或没有都可以
};
// ↑↑↑ 只需从官网复制上面这个对象 ↑↑↑

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // 初始化并导出数据库实例```