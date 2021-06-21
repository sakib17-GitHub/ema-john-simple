import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}

function LogIn(){
  const provider = new firebase.auth.GoogleAuthProvider();
 
  const [newUser , setNewUser] = useState(false);
  const [user , setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    photo :'',
    error:"",
    success:"",
  })

  const [userLoggedIn , setUserLoggedIn] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } }; 

  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email , photoURL} = res.user;
      const userSignedIn = {
        isSignedIn : true,
        name : displayName, 
        email : email,
        photo : photoURL
      };
      setUser(userSignedIn);
      setUserLoggedIn(userSignedIn);
      history.replace(from);
  
    })
    .catch(error => {
      console.log(error.message);
      console.log(error);
    })
  }
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbSignIn =( ) => {
    firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
              /** @type {firebase.auth.OAuthCredential} */
              var credential = result.credential;

              // The signed-in user info.
              var user = result.user;
              
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var accessToken = credential.accessToken;
              
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;

              // ...
            });
  }
  const handleSignOut =() => {
    firebase.auth().signOut()
    .then(res=> {
      const userSignedOut ={
        isSignedIn : false,
        name : '',
        email : '',
        photo : ''
      }
      setUser(userSignedOut);
      setUserLoggedIn(userSignedOut);
     
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  const handleBlur = (event) => {
    let isFieldValid ;
    if(event.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'name'){
      isFieldValid = event.target.value;
   }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length> 6;
      const isPasswordHasNumber = /\d{1}/.test(event.target.value);
       isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);

    }
  }

  const handleSubmit = (e) => {
      if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
              // Signed in              
              const newUserInfo = {...user};
              newUserInfo.error = "";
              newUserInfo.success = "Sign Up Successfully !";
              setUser(newUserInfo);
              setUserLoggedIn(newUserInfo);
              history.replace(from);
              updateUserName(user.name)
                    })
            .catch((error) => {
             
              var errorMessage = error.message;

              const newUserInfo = {...user};
              newUserInfo.error = errorMessage;
              newUserInfo.success = "";
              setUser(newUserInfo);
                    });
      }

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const newUserInfo = {...user};
              newUserInfo.error = "";
              newUserInfo.success = "Log In Successfully !";
              setUser(newUserInfo);
              setUserLoggedIn(newUserInfo);
              history.replace(from);
          // ...
        })
        .catch((error) => {     
          var errorMessage = error.message;
          const newUserInfo = {...user};
              newUserInfo.error = errorMessage;
              newUserInfo.success = "";
              setUser(newUserInfo);
        });
      }
      e.preventDefault();
      
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
          
        }).then(() => {
          console.log("User Name Updated Successfully")
        }).catch((error) => {
          console.log(error)
         
        }); 
  }
  return (
    <div style={{textAlign:"center"}}>
        {
          user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
                            <button onClick={handleSignIn}>Sign In Using Google</button>  
        }
        <br />
        <button onClick={handleFbSignIn}>Sign In Using Facebook</button>
        {
          user.isSignedIn && <div>
                                  <h4>Welcome ,  {user.name}</h4>
                                  <h6>Your Email : {user.email}</h6>
                                  <img src={user.photo} alt="" />
                            </div>
        }
        
        <h2>Our Own Authentication</h2>
        <input type="checkbox" onClick={()=>{setNewUser(!newUser)}}name="newUser" id="" />
        <label htmlFor="newUser"> New User Sign Up</label>
       
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Write Your Name" />}
          <br/>
          <input type="email" onBlur={handleBlur} name="email" placeholder="Write Your Email Address" required />
          <br />
          <input type="password" onBlur={handleBlur} name="password" placeholder="Write Your Password" required/>
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </form>
        <p style={{color:"red"}}>{user.error}</p>
        <p style={{color:"green"}}>{user.success}</p>
    </div>
  );
}

export default LogIn;
