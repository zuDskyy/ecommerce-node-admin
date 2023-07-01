import './widgetsm.css'
import {Visibility} from '@material-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react';
import { userRequest } from '../../requestMethods';
import { useSelector } from 'react-redux';
import { __updateUserRequestHeaders,  _getRegisterUsersByUsername } from '../../utils/requestTokenUtils';
function WidgetSm() {
    const [users,setUsers] = useState([]);
    const adminToken = useSelector(state => state.user.currentUser.accessToken)

   useEffect(() => {
    
       if(adminToken){
         __updateUserRequestHeaders(adminToken);
         _getRegisterUsersByUsername().then(data => setUsers(data))
       }
     
    
   },[adminToken])

  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {users?.map((user) => (
            <li className='widgetSmListItem' key={user._id}>
                <img src={user.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png" } alt="" className="widgetSmImg" /> 
                <div className="widgetSmUser">
                    <span className="widgetSmUsername"> {user.username}</span>
                    
                </div>
                <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon"/>
                    Display
                </button>
            </li>))}
        </ul>
    </div>
  )
}

export default WidgetSm