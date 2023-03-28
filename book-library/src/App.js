import Search from "./components/Search/Search";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rebass';
import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { Rating } from '@mui/material'
import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import BookCards from "./components/cards/cards";
import {Card, Image, Heading, Flex} from 'rebass';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import SimplePopper from "./components/cards/PreviewButton";

// Database Imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import { getAnalytics, setUserProperties } from "firebase/analytics";
import { getAdditionalUserInfo } from "firebase/auth";
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
let isNewUser;


function App() {

  // for storing searh results from API
  const [books, setBooks] = useState("");

  
  //LOGIN CODE. NEEDS TO BE IN APP.JS
  
  const [user] = useAuthState(auth);
  if (user){
    userData = user.uid;

    console.log(userData);
  }else{
    return;
  }


  return (
    <div className='App'>
      <SignIn />
      <NavbarComp/>
      <Search placeholder="So, what are we reading today?" setBooks={setBooks}/>
      <BookCards books={books}/>
      <FriendForm />
      <RetrieveFriendsData />
      <ReviewForm />
      <RetrieveReviewData />
      <RetrieveLibraryData />
    </div>
  );
}

function SignIn(){
    const signInWithGoogle = () => {
        let username = '';
        let bio;
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
          const details = result.additionalUserInfo;
          isNewUser = details.isNewUser;
          console.log(isNewUser);
          if(isNewUser){
            console.log('working')
            username = prompt('Please Enter a Username');
            bio = prompt('Please provide a Bio');
            const query = firestore.collection('users').doc(userData).set({user: userData, username: username, bio: bio})
          }
        });


        
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
  const friendsRef = firestore.collection('friend-connection').where('userId', '==', userData);
  const friendQuery = friendsRef.orderBy('createdAt').limit(5);

  const [friends] = useCollectionData(friendsRef, {idField: 'id'}); 

  console.log(friends);

  return (
    <div id="friends">
      <h2>Your Friends:</h2>
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
      <h2>Your Reviews:</h2>
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

const RetrieveLibraryData = () => {
  const query = firestore.collection('user-library').where('userId', '==', userData);
  const [library] = useCollectionData(query, {idField: 'id'})

  return (
    <div>
      <h2>Your Saved Books:</h2>
      <div className="book-wrapper">
      {library && library.map((book, index) => <Book key={index} message={book}/>)}
      </div>
      
    </div>
  )
}

const Book = (props) => {
  const { bookId, bookName, bookCover, bookPreview, postId, userId } = props.message;     
                return (
                    <div className="card" key={bookId}>
                        <Flex>
                        <Card 
                        p={3}
                        width={256}
                        color='black'
                        >
                            <Image src={bookCover} />
                            <Heading>{bookName}</Heading>
                            <SimplePopper message={bookPreview} />
                            {/* Author: {bookInfo.authors.join(", ")}<br />
                            Google Book Link: <a href={bookInfo.infoLink}>{bookInfo.infoLink}</a><br /> */}
                        </Card>
                        </Flex>
                    </div>
                )
}

const Friend = (props) => {
  const {friendId, uid } = props.message;
  return (
      <div>
          <h3>{friendId}</h3>
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

const FriendForm = () => {

  const [text, setText] = useState('');

  const data = {
      userId: userData,
      friendId: text,
      createdAt: serverTimestamp()
  }

  function handleClick(){
    console.log(data);
    const ref = firestore.collection('friend-connection');
    ref.add(data);
  }

  function handleChange(event){
      setText(event.target.value);
  }




  return (
      <Box>
          <Label htmlFor='comment'>Add a Friend!</Label>
          <Input
          id='friendForm'
          name='friend'
          type='friend'
          placeholder='Search by username.'
          onChange={handleChange}
          />
          <Button onClick={handleClick} variant='outline' mr={2}>Search</Button>
      </Box>
  )
}

export async function AddBook(bookInfo, bookId) {
  const post = bookId + userData;
  const data = {
    bookId: bookId,
    bookName: bookInfo.title,
    bookCover: bookInfo.imageLinks.smallThumbnail,
    bookPreview: bookInfo.description,
    userId: userData,
    postId: post
  }
  const query = await firestore.collection('user-library').doc(post).set(data);


  

  

}

export default App;
