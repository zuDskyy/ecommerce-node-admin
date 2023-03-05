import React, { useContext, useState } from 'react'
import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom';
import UserList from './pages/userlist/UserList';
import User from './pages/user/User';
import NewUser from './pages/newuser/NewUser';
import ProductList from './pages/productlist/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newproduct/NewProduct';
import Login from './pages/login/Login';
import Dashlayout from './layout/Dashlayout';
import { useSelector } from 'react-redux';
import { DarkModeProvider,themeContext } from './context/useThemeContext';


function App() {

  const {darkMode, toggleDarkMode}= useContext(themeContext);
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  return (
     
    <div className={darkMode ? "containerThemeDark" :"containerThemelight"}>  
    <Router>
      <Routes>
      <Route path="/login" element={admin ? <Navigate to='/'/>:<Login/>}/>
         <Route path='/' element={(!admin) ? <Navigate to='/login '/>:<Dashlayout/>}>
         <Route index  element={<Home/>} /> 
         <Route path='/users' element={<UserList/>}/>  
         <Route path='/user/:userId' element={<User/>}/>
         <Route path='/newUser' element={<NewUser/>}/> 
         <Route path='/products' element={<ProductList/>}/>  
         <Route path='/product/:productId' element={<Product/>}/>  
          <Route path='/newProduct' element={<NewProduct/>}/>
          </Route> 
        <Route path="*" element={"page not found"} />
          </Routes> 
      </Router>
      </div> 
      
  );
}

export default App;
