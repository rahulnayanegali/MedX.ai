import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Submain from '../submain/submain';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { useAuth } from '../../components/session/AuthContext'; // Import useAuth hook

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import Test from '../../test/usertype'
const Main = () => {

  const { setUser, setUserType, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');



  const handleLogin = async (email, password, type) => {
    try {
      // Authenticate user
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;

      if (currentUser) {
        // Check user type
        const userTypeDocRef = doc(db, 'Medical Professional', currentUser.uid);
        const userTypeDocSnapshot = await getDoc(userTypeDocRef);

        if (userTypeDocSnapshot.exists()) {
          // Authorized user
          setUser(currentUser);
          setUserType(type);
          localStorage.setItem('user', JSON.stringify(currentUser));
          localStorage.setItem('userType', type);
          navigate('/');
        } else {
          // Unauthorized user
          setError("You are not authorized to log in as a docotor.");
          await signOut(auth);
        }
      } else {
        console.log("No user signed in");
        // Handle case where no user is signed in
      }
    } catch (error) {
      // Handle errors
      setError(error.message); // Display error message to user
    }
  };

  useEffect(() => {
    handleLogin('patricia.normann@presbytarian.org', 3451231, "doctor")
  }, [])

  if (!user) {
    return <div className='h-full w-full text-white inline-flex justify-center items-center'>Loading...</div>; // Render loading indicator
  }
  return (
    <div className="h-screen w-screen bg-secondary justify-start items-center inline-flex">
      <Navbar />
      <Submain />

      {/* <Test/> */}
    </div>
  );
};

export default Main;
