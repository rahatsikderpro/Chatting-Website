
// let messages1 = [
//     {
//         ID:0,
//         chatID: 102,
//         senderID:1012,
//         receiver:1014,
//         message: "Hi",
//         timestamp: "202509101644"
//     },
//     {
//         ID:1,
//         chatID: 102,
//         senderID:1014,
//         receiver:1012,
//         message: "Hello",
//         timestamp: "202509101646"
//     },
//     {
//         ID:2,
//         chatID: 102,
//         senderID:1014,
//         receiver:1012,
//         message: "How are You",
//         timestamp: "202509101646"
//     },
//     {
//         ID:3,
//         chatID: 102,
//         senderID:1012,
//         receiver:1014,
//         message: "lorem10",
//         timestamp: "202509101646"
//     },
//     {
//         ID:4,
//         chatID: 102,
//         senderID:1012,
//         receiver:1014,
//         message: "Hello there",
//         timestamp: "202509101646"
//     },
// ]
// console.log("Saving messages...");
// localStorage.setItem('messages', JSON.stringify(messages1))


// function create_newchatID(user1, user2){
//     const sorted = [user1, user2].sort((a, b) => a - b);
//     let new_ChatID = Number(sorted.join(""))
//     return new_ChatID
// }
// function createnewID () {
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
//   const d = new Date();

//   const year   = d.getFullYear();
//   const month  = String(d.getMonth() + 1).padStart(2, "0");
//   const day    = String(d.getDate()).padStart(2, "0");
//   const hour   = String(d.getHours()).padStart(2, "0");
//   const minute = String(d.getMinutes()).padStart(2, "0");
//   const second = String(d.getSeconds()).padStart(2, "0");
//   const ms     = String(d.getMilliseconds()).padStart(2, "0"); // 2 digits

//   return `${year}${month}${day}${hour}${minute}${second}${ms}`;
// }
// localStorage.setItem("senderID", 1012); //default logged user
// localStorage.setItem("receiver", 1014); //default logged user
// localStorage.setItem("chatID", 102); //default logged user

// // let seethenewID = createnewID ()
// // console.log('seethenewID', seethenewID)

// function sendmessage() {
//     let chatIDfromlocalstorage = Number(localStorage.getItem("chatID"));
//     let senderIDfromlocalstorage = Number(localStorage.getItem("senderID"));
//     let receiverIDfromlocalstorage = Number(localStorage.getItem("receiver"));
    
//     let sendingmessage = {
//         ID: createnewID (),
//         chatID: chatIDfromlocalstorage,
//         senderID: senderIDfromlocalstorage,
//         receiver: receiverIDfromlocalstorage,
//         message: 'txt',
//         timestamp: createTimestampID(),
//    }
//     // Save message to localStorage
//     const existing = JSON.parse(localStorage.getItem("messages")) || [];
//     existing.push(sendingmessage);
//     localStorage.setItem("messages", JSON.stringify(existing));
//     console.log('message sent to local storage')
// }

// sendmessage();


