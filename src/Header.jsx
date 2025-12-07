import { FaCamera } from "react-icons/fa6";
import { FaSistrix } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import {getAuth, signOut,} from "firebase/auth"; 
import React, { useContext } from "react";
import { SelectedUserIDContext } from "./Contex/UserContex";

function Header(){
    const {setSelectedUserIDContext1} = useContext(SelectedUserIDContext)
    const Auth = getAuth();
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
                <div>
                    <div>Pic: nickname</div>
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