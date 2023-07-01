import { useEffect } from 'react';
import { useState } from 'react';
import './widgetlg.css'
import {format} from 'timeago.js'
import { useSelector } from 'react-redux';
import { __updateUserRequestHeaders, _getOrdersByUSerId } from '../../utils/requestTokenUtils';

function WidgetLg() {
  const [orders,setOrders] = useState([]);
  const adminToken = useSelector(state => state.user.currentUser.accessToken)
   useEffect(() => {
    
     if(adminToken){ 
        __updateUserRequestHeaders(adminToken);
       _getOrdersByUSerId().then(data => setOrders(data));
      }
    
   
   },[adminToken])

   console.log(orders)
  const Button = ({type}) =>{
    return <button className={"widgetLgButton " + type} >{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest transactions</h3>
      
      <table className="widgetLgTable">
      <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">
            Costumer
          </th>
          <th className="widgetLgTh">
            Date
          </th>
          <th className="widgetLgTh">
           Amount
          </th>
          <th className="widgetLgTh">
           Status
          </th>
          </tr>
          {orders?.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus"><Button type={order.status}/></td>
            </tr>
           ))}
            </tbody>
      </table>
    </div>
  )
}

export default WidgetLg