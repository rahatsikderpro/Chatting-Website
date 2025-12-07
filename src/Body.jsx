import Chat_list from './Chat_list'
import { FaCirclePlus } from "react-icons/fa6";


function Body () {
   
    return (
        <>
            <div className='min_Section'>
                <div className='filter_Div'>
                    <div>All</div>
                    <div>Unread</div>
                    <div>Favorites</div>
                    <div>Group</div>
                    <div><FaCirclePlus/></div>
                </div >
                <div> <Chat_list/> </div>
            </div>
        </>
    );
}

export default Body;