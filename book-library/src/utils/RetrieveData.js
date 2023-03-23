import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAnalytics } from "firebase/analytics";

const firestore = firebase.firestore();

const RetrieveData = () => {
    const friendsRef = firestore.collection('friends');
    const friendQuery = friendsRef.orderBy('createdAt').limit(5);
  
    const [friends] = useCollectionData(friendQuery, {idField: 'id'}); 
  
  
  
    const reviewsRef = firestore.collection('reviews');
    const reviewsQuery = reviewsRef.orderBy('createdAt').limit(5);
  
    const [reviews] = useCollectionData(reviewsQuery, {idField: 'id'}); 
  
    return [friends, reviews];
  }
  
  export default RetrieveData;