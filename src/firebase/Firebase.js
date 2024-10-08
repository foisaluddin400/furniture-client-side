
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj-FLcoHzrhIv_Y8yuxsZLF2kb3jtdnYg",
  authDomain: "ecommerce-website-2-d97ba.firebaseapp.com",
  projectId: "ecommerce-website-2-d97ba",
  storageBucket: "ecommerce-website-2-d97ba.appspot.com",
  messagingSenderId: "1041292810656",
  appId: "1:1041292810656:web:8be240ee520364ae152cc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)
export default Auth;
