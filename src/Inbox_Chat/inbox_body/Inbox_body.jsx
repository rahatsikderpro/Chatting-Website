
import { FaPaperPlane } from "react-icons/fa6";
import { FaFaceGrin } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
// import "../../Database/Messege_data.js";
// import "../../Database/Main_Message_Logic.jsx";
// // import "../../Database/firebase.js"; 

import { useEffect, useState, useRef } from "react";
import { db } from "../../Database/firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
// import { FaFaceGrin, FaPaperclip, FaCamera, FaPaperPlane } from "react-icons/fa6";
import styles from './Inbox_body.module.css'
// import styles from "./Chat.module.css"; // your CSS module
import { useParams } from "react-router-dom";

function Inbox_Main() {

    
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);
    const senderID = Number(localStorage.getItem('loggedUserID')); //Get = from "Login page >> Local Storage"
    const  receiverID  = Number(localStorage.getItem('receiverID'))
    let loggeduserID = senderID;
    
    function create_newchatID(user1, user2){
        const sorted = [user1, user2].sort((a, b) => a - b);
        return "Chat" + sorted.join("");
    }
    const ChatID = create_newchatID(senderID, receiverID)
    const [messages, setMessages] = useState([]);
    const handleSend = async () => {
        if (!text.trim()) return;   
        setText("");

        try {
        const sendingmessage = await addDoc(collection(db, "chats" ,String(ChatID), "messages"), {
            message : text,
            senderID: senderID,
            receiverID: Number(receiverID),
            timestamp: serverTimestamp(),
        });
        console.log("Document written with ID: ", sendingmessage.id);
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    }
   
    //listaning messege
    useEffect(()=>{
      const getcondition = query(collection(db, "chats", String(ChatID), "messages"),
        orderBy("timestamp", "asc")
      );
      const unsub = onSnapshot(getcondition, (snapshot1)=>{
        const msgs = snapshot1.docs.map(doc =>({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });
     return () => unsub();
    }, [ChatID]);
    

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);




  return (
    <>
      <div className={styles.main_Container}>
        <div className={styles.sub_Container}>
          {messages.map((msg) => {
            const msgClass =
              msg.senderID === loggeduserID
                ? styles.messege_right
                : styles.messege_left;
            return (
              <div key={msg.id} className={`${msgClass} messagesStyle`}>
                <div>{msg.message}</div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.messegeBox}>
          <div className={styles.sendBox}>
            <div><FaFaceGrin /></div>
            <input
              type="text"
              className={styles.messegeBoxInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <div><FaPaperclip /></div>
            <div><FaCamera /></div>
          </div>
          <div className={styles.sentBtn} onClick={handleSend}>
            <FaPaperPlane />
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox_Main;
