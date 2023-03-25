import NavbarComp from './components/NavbarComp';
import Search from "./components/Search";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rebass';
import BookCards from "./components/cards/cards";
import CommentForm from './components/DataWrite/CommentForm';
import ReviewForm from './components/DataWrite/ReviewForm';

// Database Imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import { getAnalytics } from "firebase/analytics";
import { documentId } from 'firebase/firestore';
import { getIdToken } from 'firebase/auth';


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
      <NavbarComp/>
      <Search />
      <BookCards />
      <CommentForm />
      <ReviewForm />
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
      {reviews && reviews.map((rvw, index) => <><Review key={Math.floor(Math.random() * 1000)} message={rvw}/><RetrieveCommentData key={Math.floor(Math.random() * 1000)} path={rvw}/></>)}
    </div>
  )
}

const RetrieveCommentData = (props) => {
  const {postId, uid} = props.path;
  const commentsRef = firestore.collectionGroup('comments').where('postId', '==', postId);
  console.log(commentsRef);

  const [comments] = useCollectionData(commentsRef, {idField: 'id'})

  console.log(commentsRef);

  return (
    <div>
      {comments && comments.map((com, index) => <Comment key={index} message={com}/>)}
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
  const {text, uid, rating, book, postId} = props.message;

  return (
    <div>
        <h3>{book}</h3>
        <h3>{rating}</h3>
        <h3>{text}</h3>
    </div>
)
}

const Comment = (props) => {
  const {text, user, uid} = props.message

  return (
    <div id='comment'>
      <h3>{user}</h3>
      <h4>{text}</h4>
    </div>
  )
}

export default App;
