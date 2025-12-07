import React, { useContext } from 'react';
import styles from './Inbox_top.module.css'
import { FaArrowLeft } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import { SelectedUserIDContext } from '../../Contex/UserContex.js';

function Inbox(){
    const {setSelectedUserIDContext1} = useContext(SelectedUserIDContext)
    const handleBackward = ()=>{
        setSelectedUserIDContext1(null);
        localStorage.removeItem("receiverID")
    };
    return(
        <div className={styles.inbox_Top}>
            <div className={styles.chat_Header}>
                <div className={styles.chat_Header_Left}>
                    <FaArrowLeft className={styles.backwardArrow} onClick={handleBackward} />
                    <div>PIC</div>
                    <div>Nick Name</div>
                </div>
                <div className={styles.chat_Header_Right}>
                    <FaCamera/>
                    <FaPhone/>
                    <FaEllipsisVertical/>
                </div>
            </div>
        </div>
        
    );
}

export default Inbox