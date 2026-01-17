import { useState, useEffect, useContext, useRef } from "react";
import styles from './Login_Page.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth"; 
import { addDoc, collection, serverTimestamp, getDocs, query, where} from "firebase/firestore";
import { db } from "../Database/firebase.js";
import {LoadingState} from "../Contex/LoadingContex.js"
import {UserIDContext, LoggedUserContext} from "../Contex/UserContex.js"
import { FaArrowLeft } from "react-icons/fa6";


function Login_Page () {
    const {setloadingState} = useContext(LoadingState)
    const {setUserID} = useContext(UserIDContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setErrorText] = useState(null);
    
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const [registrationstate, setregistrationstate]= useState(false);
    const auth = getAuth();
    const [loggedUserID, setLoggedUserID] = useState(null);
    const [email, setEmail] = useState("");
    const [FullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    
    
    //registration with Profile Photo
    const cloudName = 'dctbbdfng';
    const unsignedUploadPreset = 'Profiles';
    // *********** Upload file to Cloudinary ******************** //
    const fileRef = useRef(null);
    function uploadFile(file) {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const fd = new FormData();
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tags for image admin in Cloudinary
        fd.append('file', file);

        return fetch(url, { 
                    method: 'POST', 
                    body: fd 
        })
        .then(res => res.json())
        .then(data => data.secure_url)  // now this value is returned to caller
        .catch(err => {
            console.error('Error uploading the file:', err);
            throw err;  // re-throw so await can catch
        });
    
        // fetch(url, {
        //     method: 'POST',
        //     body: fd,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //     // File uploaded successfully
        //     return data.secure_url;
        //     })
        //     .catch((error) => {
        //     console.error('Error uploading the file:', error);
        //     });
    }



    //login logic
    const handleLogin = async (e)=> {
        e.preventDefault();
        if (!email || !password) return;

        setEmail("");     
        setPassword("");  
        console.log("Login button clicked")
        
        try{
            const userinfo = await signInWithEmailAndPassword (auth, email, password)
            // console.log("Logged in!", userinfo.user);
            // console.log("UID see", userinfo.user.uid);
            // console.log("UID email", userinfo.user.email);



            // // Auto store loggeduserID   
            const wheretofind = collection(db, "users");
            const allUserCollection = await getDocs(wheretofind);
            const usersArray = allUserCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const loggedUser = usersArray.find(u => u.email === userinfo.user.email);
            if (loggedUser) {
                setLoggedUserID(loggedUser.userID);
                localStorage.setItem('loggedUserID', loggedUser.userID)
                setUserID(loggedUser.userID)
                console.log('from login Page usersArray.userID:', loggedUser.userID)
            }
        }
        catch (error) {
            console.error("Login failed:", error.message, error.code);
            setErrorText(firebaseErrorMessage(error.code));
        };
        
    };
    
    useEffect(() => {
        console.log("from loginPage loggedUserID (state updated):", loggedUserID);
    }, [loggedUserID]);


     //handle register
    const handleregister = async (e) => {
        e.preventDefault();
        try {
            //send to firebase database
            const file = fileRef.current.files[0];  // get the selected file
            //const file = fileRef.current?.files?.[0] || null;
            let receivedurl = "";
            console.log("Selected file:", file);
            console.log("receivedurl", receivedurl);                    // prepare variable to store the URL
            if (file) {
                receivedurl = await uploadFile(file); // call uploadFile and wait for URL
                
            }
            
            const userinfo = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered in Auth:", userinfo.user.email);
            
            const wheretofind = collection(db, "users");
            const allUserCollection = await getDocs(wheretofind);
            const usersArray = allUserCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            //console.log("usersList user", usersArray);
             
            //unique ID finding
            let newChatID;
            if (usersArray.length === 0) {
                newChatID = 1000;  // starting number for first user
            } 
            else {
                    const allChatIDs = usersArray.map(user => user.userID); // extract IDs
                    const maxChatID = Math.max(...allChatIDs); // find max
                    newChatID = maxChatID + 1; // increment
            }
            
            
            const newUser = await addDoc(collection(db, "users"), {
                    email: userinfo.user.email,   
                    fullName: FullName,      // from top state
                    userID: newChatID,
                    profile_image_url: receivedurl
            });
            console.log("✅ User registered with Firestore ID:", newUser.id, "and ChatID:", newChatID);
            setregistrationstate(false)
            handleLogin(e);
            
            
        } catch (error) {
                console.error("Registration failed:", error.message);
                setErrorText(firebaseErrorMessage(error.code));
            }
    }

    
    const showReg =  ()=>{
        setregistrationstate(true)

    };
    const showLogin = ()=>{
        setregistrationstate(false)
    }
    const firebaseErrorMessage = (code) => {
        switch (code) {
            case "auth/invalid-credential":
                return "Incorrect email or password.";

            // need to set code correctly
            case "auth/email-already-in-use":
                return "This email is already registered.";
            case "auth/weak-password":
                return "Password should be at least 6 characters.";
            default:
                return "Something went wrong. Please try again.";
        }
    };
    // const consolshow = ()=>{
    //     console.log("Reg. form info ", FullName, email, password)
    // }
    if(registrationstate){

         return (
            <div>
                <div className={styles.mainContainer}>
                    <div className={styles.loginText}>Registration Form</div>
                    <form onSubmit={handleregister} >
                        <div className={styles.loginSection}>
                            <input 
                                type="text" 
                                className={styles.inputSection} 
                                placeholder='Full Name' value={FullName} 
                                onChange={(e) => setFullName(e.target.value)}
                                autoComplete="on"
                            />
                            <input 
                                type="email" 
                                className={styles.inputSection} 
                                placeholder='Email' value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="on"
                            />
                            <div className={styles.passwordDiv}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className={styles.passwordInputSection} 
                                    placeholder='password' value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="on"
                                />
                                <div  onClick={togglePassword} className={styles.eyeicon}> {showPassword ? <FaEyeSlash /> : <FaEye />}</div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileRef}
                            />
                            <button className={styles.regBtn}>Sign Up</button>
                            {showError && <p className="error">{showError}</p>}
                        </div>
                    </form>
                    <div className={styles.orClass}>or</div>
                    <button className={styles.loginBtn} onClick={showLogin}>Log In</button>
                </div>
                
            
            </div>
        );
    }    
   
    
    return (
        <div>
            <div className={styles.mainContainer}>
                <div className={styles.loginText}>Log In</div>
                <form onSubmit={handleLogin} autoComplete="on">
                    <div className={styles.loginSection}>
                        <input 
                            type="email" 
                            className={styles.inputSection} 
                            placeholder='Email' value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="on"
                        />
                        <div className={styles.passwordDiv}>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className={styles.passwordInputSection} 
                                placeholder='password' value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="on"
                            />
                            <div  onClick={togglePassword} className={styles.eyeicon}> {showPassword ? <FaEyeSlash /> : <FaEye />}</div>
                        </div>
                        <button className={styles.loginBtn}>Log In</button>
                        {showError && <p className="error">{showError}</p>}
                        
                    </div>
                </form>
                <div className={styles.orClass}>or</div>
                <button className={styles.regBtn} onClick={showReg}>Sign Up</button>
            </div>
        
        </div>
        
    );
    
};

export default Login_Page;