import './styles.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7ABLtFLbHH5QN-C5OhusEQ-6xyR76pLM",
  authDomain: "notes-web-ca6b2.firebaseapp.com",
  projectId: "notes-web-ca6b2",
  storageBucket: "notes-web-ca6b2.appspot.com",
  messagingSenderId: "787319762715",
  appId: "1:787319762715:web:678c5c69dd336b1544edbe",
  measurementId: "G-RBM7KM5N81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const isLoggedIn = false;
const auth = getAuth(app);

console.log(app)
const analytics = getAnalytics(app);

// Initialize the FirebaseUI Widget using Firebase.
// Login using email/password
export const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  // step 1: try doing this w/o error handling, and then add try/catch
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

  // step 2: add error handling
  // try {
  //   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  // }
  // catch(error) {
  //   console.log(`There was an error: ${error}`)
  //   showLoginError(error)
  // }
}

// Create new account using email/password
export const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value
  console.log(email, password)



  await createUserWithEmailAndPassword(auth, email, password)


}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)

    }
    else {
      // lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

// Log out
const logout = async () => {
  await signOut(auth);
}


monitorAuthState();
export default function cows() {
  console.log("COWSS")
}

const register = document.getElementById('register');
const login = document.getElementById('login');
const error = document.getElementById('error')
const navbar = document.getElementById('navbar')
const dashboard = document.createElement('a')
const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');


if (isLoggedIn === false) {
  dashboard.href = '/login.html'
  dashboard.innerText = 'Login'

}
else {
  dashboard.href = '/dashboard.html'
  dashboard.innerText = 'Dashboard'


}
navbar.appendChild(dashboard)

register.onclick = async (e) => {
  e.preventDefault();

  try {
    await createAccount();
    window.location.href = '/dashboard.html'
    isLoggedIn = true
  }
  catch (e) {
    console.log('ERRR', e)
    error.innerText = e.message

  }
};

login.onclick = async (e) => {

  try {
    await loginEmailPassword();
    isLoggedIn = true
    window.location.href = '/dashboard.html'

  }
  catch (e) {
    console.error(e)
    error.innerHTML = e.message
  }
};

