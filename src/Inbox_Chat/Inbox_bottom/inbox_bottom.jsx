import styles from './inbox_bottom.module.css'
import { FaPaperPlane } from "react-icons/fa6";
import { FaFaceGrin } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
import { useState } from "react";
import "../../Database/Messege_data.js";
import "../../Database/Main_Message_Logic.jsx"; 


function Inbox_Bottom () { 
    // function create_newchatID(user1, user2){
    //     const sorted = [user1, user2].sort((a, b) => a - b);
    //     let new_ChatID = Number(sorted.join(""))
    //     return new_ChatID
    // }
    // function createnewID () {
    //     let messages = JSON.parse(localStorage.getItem('messages'))
    //     console.log('messages', messages)
    //     let maxID = -999
    //     for (let i = 0; i < messages.length; i++) {
    //         const element = messages[i].ID;
    //         if (maxID < element) {
    //             maxID = element
    //             console.log('maxID', maxID);
    //         };
    //     }
    //     let createnewID1 = maxID + 1;
    //     return createnewID1;
    // };    
    // function createTimestampID() {
    // const d = new Date();

    // const year   = d.getFullYear();
    // const month  = String(d.getMonth() + 1).padStart(2, "0");
    // const day    = String(d.getDate()).padStart(2, "0");
    // const hour   = String(d.getHours()).padStart(2, "0");
    // const minute = String(d.getMinutes()).padStart(2, "0");
    // const second = String(d.getSeconds()).padStart(2, "0");
    // const ms     = String(d.getMilliseconds()).padStart(2, "0"); // 2 digits

    // return `${year}${month}${day}${hour}${minute}${second}${ms}`;
    // }
    // localStorage.setItem("senderID", 1012); //default logged user
    // localStorage.setItem("receiver", 1014); //default logged user
    // localStorage.setItem("chatID", 102); //default logged user
    
    
    // const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || []);
    // function sendmessage(text) {
    //     let chatIDfromlocalstorage = Number(localStorage.getItem("chatID"));
    //     let senderIDfromlocalstorage = Number(localStorage.getItem("senderID"));
    //     let receiverIDfromlocalstorage = Number(localStorage.getItem("receiver"));
        
    //     let sendingmessage = {
    //         ID: createnewID (),
    //         chatID: chatIDfromlocalstorage,
    //         senderID: senderIDfromlocalstorage,
    //         receiver: receiverIDfromlocalstorage,
    //         message: text,
    //         timestamp: createTimestampID(),
    //     }
    //     // Save message to localStorage
    //     const updated = [...messages, sendingmessage];

    //     // const existing = JSON.parse(localStorage.getItem("messages")) || [];
    //     // existing.push(sendingmessage);
    //     // localStorage.setItem("messages", JSON.stringify(existing));
    //     // console.log('message sent to local storage')

    //     localStorage.setItem("messages", JSON.stringify(updated));
    //     setMessages(updated);
    // }
    
    // // let seethenewID = createnewID ()
    // // console.log('seethenewID', seethenewID)
    // const [text, setText] = useState("");
    // const handleSend = () => {
    //     sendmessage(text);   // pass value to another function (parent or imported one)
    //     setText("");    // clear input after sending
    // };
    
    
    // return (
    //     <div className={styles.container}>
    //         <div className={styles.messegeBox}>
    //             <div className={styles.sendBox}>
    //                 <div><FaFaceGrin/></div>
    //                 <input type="text" className={styles.messegeBoxInput} onChange={(e) => setText(e.target.value)}/>
    //                 <div><FaPaperclip/></div>
    //                 <div><FaCamera/></div>
    //             </div>
    //             <div className={styles.sentBtn} onClick={handleSend}><FaPaperPlane/></div>
    //         </div>
    //     </div>
    // );
};
    
export default  Inbox_Bottom;