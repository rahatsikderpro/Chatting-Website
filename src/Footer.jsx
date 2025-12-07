import { FaMessage } from "react-icons/fa6";
import { FaSignalMessenger } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";

function Footer() {
    return (
        <div className="footer"> 
            <div className="footer_Chats"> 
                <FaMessage/>
                <div>Chats</div>
            </div>
            <div className="footer_Updates"> 
                <FaSignalMessenger/>
                <div>Updates</div>
            </div>
            <div className="footer_Group"> 
                <FaUserGroup/>
                <div>Groups</div>
            </div>
            <div className="footer_Phone"> 
                <FaPhone/>
                <div>Calls</div>
            </div>
        </div> 
    );
}

export default Footer;