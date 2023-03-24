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

const RetrieveFriendsData = () => {
  const friendsRef = firestore.collection('friends');
  const friendQuery = friendsRef.orderBy('createdAt').limit(5);

  const [friends] = useCollectionData(friendQuery, {idField: 'id'}); 


  return (
    <div>
      {friends && friends.map(frnd => <Friend key={frnd.id} message={frnd}/>)}
    </div>
  )

}

const RetrieveReviewData = () => {
  const reviewsRef = firestore.collection('reviews');
  const reviewsQuery = reviewsRef.orderBy('createdAt').limit(5);

  const [reviews] = useCollectionData(reviewsQuery, {idField: 'id'}); 

  return (
    <div>
      {reviews && reviews.map(rvw => <Review key={rvw.id} message={rvw.text} rating={rvw.rating} book={rvw.book}/>)}
    </div>
  )
}

const Friend = (props) => {
  const {text, uid } = props.message;
  return (
      <div>
          <h3>{text}</h3>
      </div>
  )
}

const Review = (props) => {
  const {text, uid} = props.message;
  const {rating} = props.rating;
  const {book} = props.book;
  const {comments} = props.comments;

  return (
    <div>
        <h3>{book}</h3>
        <h3>{rating}</h3>
        <h3>{text}</h3>
        <div>{comments && comments.map(com => <Comment user={com.user} text={com.text}/>)}</div>

    </div>
)
}

const Comment = (props) => {
  const {user, uid} = props.user
  const {text} = props.message

  return (
    <div>
      <h3>{user}</h3>
      <h4>{text}</h4>
    </div>
  )
}

export default App;
