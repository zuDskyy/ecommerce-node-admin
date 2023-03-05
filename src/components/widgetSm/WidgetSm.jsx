import './widgetsm.css'
import {Visibility} from '@material-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react';
import { userRequest } from '../../requestMethods';
function WidgetSm() {
    const [users,setUsers] = useState([]);

   useEffect(() => {
     const getUsers = async () => {
        try{
        const res= await userRequest.get("users/?new=true")
        setUsers(res.data);
        }catch (err){  
            console.error(err)
        }
        
     }
     getUsers();
   },[])

  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {users.map((user) => (
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