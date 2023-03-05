import React, { useContext, useEffect, useState } from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { themeContext } from "../../context/useThemeContext";



function Sidebar() {

   const [active, setActive] = useState("1");
 
   useEffect(() => {
      setActive(window.localStorage.getItem('MY_APP_ACTIVE'));
   },[])
   
    useEffect(() => {
     window.localStorage.setItem('MY_APP_ACTIVE', active)
    },[active])
    
   const {darkMode} = useContext(themeContext);
const handleClick = (e) => {
    setActive(e.target.id)
   }




  return (
    <div className= "sidebar" >
      <div className={darkMode ?"sidebarWrapper": "barColor"}>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList" onClick={handleClick}>
            <Link to='/' className="link" id={"1"}>
            <li key={1} id={"1"} className={active === "1" ? " siderbarListItem active" :"siderbarListItem "}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li  className="siderbarListItem">
              <Timeline className="sidebarIcon" />
              Analitycs
            </li>
            <li className="siderbarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList" onClick={handleClick}> 
          <Link to='/users' className="link">
            <li  key={4} id={"4"} className={active === "4" ? " siderbarListItem active" :"siderbarListItem "}>
              <PermIdentity className="sidebarIcon" />
              Users
            </li>
            </Link>
            <Link to='/products'   className="link">
            <li key={5} id={"5"} className={active === "5" ? " siderbarListItem active" :"siderbarListItem "}>
              <Storefront className="sidebarIcon" />
              Products
            </li>
            </Link>
            <li className="siderbarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="siderbarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="siderbarListItem ">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="siderbarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="siderbarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="siderbarListItem ">
              <WorkOutline className="sidebarIcon" />
              Menage
            </li>
            <li className="siderbarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="siderbarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
