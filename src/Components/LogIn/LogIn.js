import React, { useContext, useState } from 'react';
 import './LogIn.css';
import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from'./firebase.Config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

 
 

function LogIn() {
  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }
  

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn:false,
    newUser: false, 
    name: '',
    email: '',
    password: '',
    Photo: ''
  })

  const [ setLoggedInUser] =useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(GoogleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser= {
        isSignedIn: true,
        name:displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      history.replace(from);
      console.log(displayName, photoURL, email);
    })
    .catch(err => {
      console.log(err);
      console.log(err.massage);
    })
  }
  


  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
     const SignOutUser= {
       isSignedIn: false ,
       name: '',
       email: '',
       photo: '',
       error: '',
       success: false

  }
  setUser(SignOutUser);
  console.log(res)
    })
    .catch( err => {

    })
  }

  const handleBlur = (event) => {
    const isFieldValid = true;
    // console.log(event.target.name , event.target.value)
    if(event.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value) ;
       isFieldValid = isPasswordValid && passwordHasNumber  ;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
   //  console.log(user.email, user.password)
     if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error= '';
        newUserInfo.success=true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      
      });
     }

     if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error= '';
        newUserInfo.success=true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('sign in user info', res.user)
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
     }

     e.preventDefault();
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name
      }).then(function() {
        console.log('user name update successfully')
      }).catch(function(error) {
        console.log(error)
      });
  }



  return (
    <div className="App"> 
      
        
        
         {/* {
           user.isSignedIn && 
           <div> <h1> Welcome : {user.name} </h1>
           <h3>Your email: {user.email}</h3>
           <img src={user.photo} alt=""/>
           </div>
         } */}

        <br/>
         <input type="checkBox" name="newUser" onChange={ () => setNewUser(!newUser) } id=""/>
         <label htmlFor="newUser"> New User Sign Up </label>
         <form onSubmit={handleSubmit}>
           { newUser && <input className="input" type="text" name="name" onBlur={handleBlur}  placeholder="enter your name" required/> } 
           <br/>    
           <input className="input" type="text" name="email" onBlur={handleBlur} placeholder="enter your email" required/>
           <br/>
           <input  className="input" type="password" name="password" onBlur={handleBlur} placeholder="enter your password" required/>
           <br/>
           <input  className="input" type="submit" value={newUser ? "Sign Up" : "Log In"}/>
         </form>
         <p style={{color:'red'}}>{user.error}</p>
        {
          user.success &&
         <p style={{color:'green'}}> User {newUser?  'Created': 'Logged In'} Successfully</p>
          
        }
        <br/>
        {
          user.isSignedIn ? <button onClick={handleSignOut}>google Sign Out</button> :
         <button onClick={handleSignIn}> Continue With Google Sign In</button>
        }

    </div>
  );
}

export default LogIn;
