import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { db } from "./Database/firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // ✅ NEW
import {UserContext, UserIDContext, SelectedUserIDContext} from "./Contex/UserContex.js"



function Chat_list(){

    const {usernamefromContext} = useContext(UserContext)
    const {SelectedUserIDContext1, setSelectedUserIDContext1} = useContext(SelectedUserIDContext)

    const {userID1} = useContext(UserIDContext)
    console.log("const {userID}", userID1)
    let loggedUserID = Number(localStorage.getItem('loggedUserID')) || userID1; //Get = from "Login page >> Local Storage"
    //console.log("from Chat list loggedUserID", loggedUserID)
    const navigate = useNavigate(); // ✅ NEW
    const [userslist, setUsers] = useState()
    const handleUserClick = (userID) => {
        //navigate(`/chat/${userID}`); // ✅ MODIFIED (was localStorage before)
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
            const filteredUsers = usersList.filter(user => user.userID !== loggedUserID); //userID will get from another fiel 
            setUsers(filteredUsers);
            //setUsers(usersList);
        });
        return () => unsub();
    }, [loggedUserID]);
    //console.log('userslist iin chat_list', userslist)
    
    return (
        
        <>

            <div>
                {userslist && userslist.map(user => (
                    <React.Fragment key={user.id}>
                        <div className="chat_list" 
                            onClick={() => handleUserClick(user.userID)} // ✅ pass receiverID
                            style={{ cursor: "pointer" }}
                        >
                            <div className="chat_item">
                                <img className="chat_avatar" src="/Chat_Pic_1.png" />
                                <div className="chat_info">
                                    <div className="chat_name">{user.fullName}</div>
                                    <div className="chat_last-message">Hey, what's up?</div>
                                </div>
                            </div>
                            <div className="chat_time">7:43 PM</div> {/* now outside chat_item */}
                        </div>
                    </React.Fragment>
                ))}
            </div>


        </>
    );
}
export default Chat_list;