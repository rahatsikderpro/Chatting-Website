import Header from './Header.jsx'
import Body from './Body.jsx'
import Footer from './Footer.jsx'
import Inbox from './Inbox_Chat/Inbox_top/Inbox_top.jsx';
import Inbox_Main from './Inbox_Chat/inbox_body/Inbox_body.jsx';
// import Inbox_Bottom from './Inbox_Chat/Inbox_bottom/inbox_bottom.jsx';
import Login_Page from './Login_Authentication/Login_Page.jsx';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,} from "firebase/auth"; 
import {UserContext, UserEmailContext, UserIDContext, SelectedUserIDContext} from "./Contex/UserContex.js"
import {LoadingState} from "./Contex/LoadingContex.js"
// import { db } from "./Database/firebase.js";
import { addDoc, collection, serverTimestamp, getDocs, query, where} from "firebase/firestore";


function App() {
  const [usernamefromContext, setusernamefromContext] = useState();
  const [loadingState, setloadingState] = useState(true);
  const [SelectedUserIDContext1, setSelectedUserIDContext1] = useState(null);

  const [user, setUser] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  console.log('userEmail', userEmail)


  const [userID1, setUserID] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null); // add 2
  const Auth = getAuth()
  useEffect(()=>{
    const checkAuthuser = onAuthStateChanged(Auth, (currentUser)=> {
      setUser(currentUser);
      setloadingState(false);
      if (currentUser) setusernamefromContext(currentUser.email);
    });
    return (()=> checkAuthuser());
  }, []);
  
  console.log('SelectedUserIDContext App.jsx', SelectedUserIDContext1)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  //login check 
  if (loadingState ) {return (<div className="loading_div"> Loading...</div>)};
  if(SelectedUserIDContext1){
    return (
      <SelectedUserIDContext value={{SelectedUserIDContext1, setSelectedUserIDContext1}}>
        <div>
          <Inbox/>
          <Inbox_Main/>
        </div>
      </SelectedUserIDContext>
    )
  }
  return(
    <>
      {/* <div>
        <Login_Page/>
      </div> */}
      {/* <div className='app_Container'>
        <Header/>
        <Body/>
        <Footer/>
      </div> */}
      {/* 
      <div>
        <Inbox/>
        <Inbox_Main/>
        <Inbox_Bottom/>
      </div>    */}
    
      <BrowserRouter>
        <UserContext value={{usernamefromContext, setusernamefromContext, setloadingState}}>
        <UserEmailContext value={{userEmail, setUserEmail}}>
        <UserIDContext value={{userID1, setUserID}}>
        <SelectedUserIDContext value={{SelectedUserIDContext1, setSelectedUserIDContext1}}>
          <LoadingState value= {{setSelectedUser}}>
                
                <Routes>
                
                  <Route path='/' element= {user ? 
                                                (<div className='app_Container'>
                                                    <Header/>
                                                    <Body/>
                                                    <Footer/>
                                                  </div>) : 
                                                (<Login_Page/>)} />
                </Routes>

          </LoadingState>
        </SelectedUserIDContext>
        </UserIDContext>
        </UserEmailContext>
        </UserContext>                                      
      </BrowserRouter>


    </>
    

  );

};

export default App;