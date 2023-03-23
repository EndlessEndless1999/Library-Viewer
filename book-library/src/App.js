import Body from './components/Body';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Database Imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDyslQiNsijMCXTzT7eyrNQUkCFIc4I9MI",
  authDomain: "bookworms-ee96a.firebaseapp.com",
  projectId: "bookworms-ee96a",
  storageBucket: "bookworms-ee96a.appspot.com",
  messagingSenderId: "1058318817192",
  appId: "1:1058318817192:web:fdc2ad63f4315bf8ceef9d",
  measurementId: "G-0P65N3JF8T"
};


// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  
  //LOGIN CODE. NEEDS TO BE IN APP.JS
  const [user] = useAuthState(auth);

  return (
    <div className='App'>
      <section>
        {user ? <Body /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <button onClick={signInWithGoogle}>Sign In</button>
    )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
