import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAZMUp4S3wWSackZp5MBf04qvmgByvLvDc",
  authDomain: "burger-builder-ef917.firebaseapp.com",
  databaseURL: "https://burger-builder-ef917-default-rtdb.firebaseio.com",
  projectId: "burger-builder-ef917",
  storageBucket: "burger-builder-ef917.appspot.com",
  messagingSenderId: "11804243114",
  appId: "1:11804243114:web:a876339198cbefe1348cd3",
  measurementId: "G-RGS8Q2WCP3",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export { provider }


