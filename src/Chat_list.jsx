import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { db } from "./Database/firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import {UserContext, UserIDContext, SelectedUserIDContext, LoggedUserContext} from "./Contex/UserContex.js"


function Chat_list(){

    const {usernamefromContext} = useContext(UserContext)
    const {SelectedUserIDContext1, setSelectedUserIDContext1} = useContext(SelectedUserIDContext)
    const {currentUser, setCurrentUser} = useContext(LoggedUserContext);

    const {userID1} = useContext(UserIDContext)
    console.log("const {userID}", userID1)
    let loggedUserID = Number(localStorage.getItem('loggedUserID')) || userID1; //Get = from "Login page >> Local Storage"
    const [userslist, setUsers] = useState()
    const [loggeduser, setLoggedUser] = useState()
console.log("loggeduser", loggeduser)
    const handleUserClick = (userID) => {
        localStorage.setItem("receiverID", userID);
        setSelectedUserIDContext1(userID);
        console.log('SelectedUserIDContext Chat_list.jsx', SelectedUserIDContext1)
    };
    console.log("from Chat_list usernamefromContext:", usernamefromContext )
    useEffect(() => {
    // Listen to the entire users collection
        if (!loggedUserID) return;
        const usersRef = collection(db, "users");
        const unsub = onSnapshot(usersRef, (snapshot) => {
            const usersList = snapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data(),
            }));
            const filteredUsers = usersList.filter(user => user.userID !== loggedUserID); 
            //const filteredLoggedUser = usersList.filter(user => user.userID == loggedUserID);
            
            const filteredLoggedUser = usersList.find(user => user.userID === loggedUserID);
            setUsers(filteredUsers);
            setLoggedUser(filteredLoggedUser);
            setCurrentUser(filteredLoggedUser.fullName);
        });
        return () => unsub();
    }, [loggedUserID]);

    return (
        <>
            <div>
                {userslist && userslist.map(user => (
                    <React.Fragment key={user.id}>
                        <div className="chat_list" 
                            onClick={() => handleUserClick(user.userID)} // set to loocal storage receiverID
                            style={{ cursor: "pointer" }}
                        >
                            <div className="chat_item">
                                <img className="chat_avatar" src="/Chat_Pic_1.png" />
                                <div className="chat_info">
                                    <div className="chat_name">{user.fullName}</div>
                                    <div className="chat_last-message">Hey, what's up?</div>
                                </div>
                            </div>
                            <div className="chat_time">7:43 PM</div>
                        </div>
                        <div>{loggeduser.fullName} Kello</div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
export default Chat_list;