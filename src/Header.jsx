import { FaCamera } from "react-icons/fa6";
import { FaSistrix } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import {getAuth, signOut,} from "firebase/auth"; 
import { useContext } from "react";
import { SelectedUserIDContext, LoggedUserContext} from "./Contex/UserContex.js";

function Header(){
    const {setSelectedUserIDContext1} = useContext(SelectedUserIDContext)
    const Auth = getAuth();
    const {currentUser, setCurrentUser} = useContext(LoggedUserContext);
    console.log ("currentUser Headerr", currentUser); 
    const handleLogout = async () => {
        try {
            
            await signOut(Auth);
            localStorage.removeItem("loggedUserID");
            localStorage.removeItem("receiverID");
            //setUser(null); // optional, Firebase listener will handle it too
            console.log("User logged out successfully");
            setSelectedUserIDContext1(null)
            
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return(
        <header>
            <nav className="nav_Bar">
                <div className="nav_Bar_info">
                    <img className="header_avatar" src={currentUser?.profile_image_url || "/Chat_Pic_1.jpg"} />                
                    <div>{currentUser?.fullName || "Name"}</div>
                </div>

                <div className="nav_BarIcon">
                    {/* <div><FaCamera/></div>
                    <div><FaSistrix/></div>
                    <div onClick={handleLogout}><FaEllipsisVertical/></div> */}
                    <button onClick={handleLogout} className="log_Out_btn">Log Out</button>
                </div>
            </nav>
        </header>
    );
}
export default Header