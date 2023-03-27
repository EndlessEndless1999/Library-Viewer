import SearchBar from "./components/Search";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rebass';
import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { Rating } from '@mui/material'
import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import BookCards from "./components/cards/cards";

// Database Imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import { getAnalytics } from "firebase/analytics";
import { documentId } from 'firebase/firestore';
import { getIdToken } from 'firebase/auth';


import 'rebass';
import NavbarComp from './components/NavbarComp';



// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyslQiNsijMCXTzT7eyrNQUkCFIc4I9MI",
  authDomain: "bookworms-ee96a.firebaseapp.com",
  projectId: "bookworms-ee96a",
  storageBucket: "bookworms-ee96a.appspot.com",
  messagingSenderId: "1058318817192",
  appId: "1:1058318817192:web:fdc2ad63f4315bf8ceef9d",
  measurementId: "G-0P65N3JF8T"
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const firestore = firebase.firestore();
let userData;


function App() {

  
  //LOGIN CODE. NEEDS TO BE IN APP.JS
  
  const [user] = useAuthState(auth);
  if (user){
    userData = user.email;

    console.log(userData);
  }


  return (
    <div className='App'>
      <SignIn />
      <NavbarComp/>
      <SearchBar placeholder="So, what are we reading today?"/>
      <BookCards />
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
      {reviews && reviews.map((rvw, index) => <><Review key={Math.floor(Math.random() * 1000)} message={rvw}/><CommentForm message={userData} data={rvw}/><RetrieveCommentData key={Math.floor(Math.random() * 1000)} path={rvw}/></>)}
    </div>
  )
}

const RetrieveCommentData = (props) => {
  const {postId, uid} = props.path;
  const commentsRef = firestore.collection('comments').where('postId', '==', postId);
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
  const {text, user, uid, postId} = props.message

  return (
    <div id='comment'>
      <h3>{user}</h3>
      <h4>{text}</h4>
    </div>
  )
}

const ReviewForm = (props) => {
  const [text, setText] = useState('');
  const [score, setScore] = useState('');
  const postID = userData + 'BOOK';

  const data = {
      book: 'Book',
      createdAt: serverTimestamp(),
      postId: postID,
      rating: score,
      text: text,
  }

  async function handleClick(){
    const ref = firestore.collection('reviews');
    ref.add(data);
  }

  function handleChange(event){
      setText(event.target.value);
  }

  function handleReviewChange(event){
      setScore(event.target.value)
  }





  return (
      <Box>
          <Label htmlFor='review'>Review</Label>
          <Rating name="size-medium" defaultValue={2} onChange={handleReviewChange}/>
          <Input
          id='reviewForm'
          name='review'
          type='review'
          placeholder='Add Your Review Here.'
          onChange={handleChange}
          />
          <Button onClick={handleClick} variant='outline' mr={2}>Submit</Button>
      </Box>
  )
}

const CommentForm = (props) => {
  const {postId} = props.data

  const [text, setText] = useState('');

  const data = {
      postId: postId,
      text: text,
      user: userData,
      createdAt: serverTimestamp()
  }

  function handleClick(){
    console.log(data);
    const ref = firestore.collection('comments');
    ref.add(data);
  }

  function handleChange(event){
      setText(event.target.value);
  }




  return (
      <Box>
          <Label htmlFor='comment'>Comment</Label>
          <Input
          id='commentForm'
          name='comment'
          type='comment'
          placeholder='Add Your Comment Here.'
          onChange={handleChange}
          />
          <Button onClick={handleClick} variant='outline' mr={2}>Submit</Button>
      </Box>
  )
}

export default App;
