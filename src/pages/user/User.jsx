import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import { useState } from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import app from '../../firebase';
import {  updateUser } from '../../redux/apiCalls';
import './user.css'


function User() {
    const dispatch = useDispatch();
    const [file,setFile] = useState(null)
    const [inputs, setInputs] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.pathname.split("/")[2];
    const product = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );
 
   const handleChange = (e) => {
    setInputs(prev => {
        return {...prev , [e.target.value] : e.target.value}
    })
   }
   const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime()  + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
            default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {...inputs, img: downloadURL}
          updateUser(product._id, user, dispatch)
         
           navigate('/users');
          
        });
      }
    );
    
   }
 
  return (
    <div className='user'>
       <div className="userTitleContainer">
        <h1 className='userTitle'>Edit User</h1>
        <Link to="/newUser">
        <button className="userAddButton">Create</button>
        </Link>
       </div>
       <div className="userContainer">
        <div className="userShow">
            <div className="userShowTop">
                <img src={product.img} alt="" className="userShowImg" />
                <div className="userShowTopTitle">
                    <span className="userShowUsername">{product.username}</span>
                </div>
            </div>
            <div className="userShowBottom">

                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                <PermIdentity className="userShowIcon"/>
                <span className="userShowInfoTitle">
                   {product.username}
                </span>
                </div>
                <div className="userShowInfo">
                <CalendarToday className="userShowIcon"/>
                <span className="userShowInfoTitle">
                    10.12.1998
                </span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon"/>
                <span className="userShowInfoTitle">
                   +1 123 456 78
                </span>
                </div>
                <div className="userShowInfo">
                <MailOutline className="userShowIcon"/>
                <span className="userShowInfoTitle">
                    {product.email}
                </span>
                </div>
                <div className="userShowInfo">
                <LocationSearching className="userShowIcon"/>
                <span className="userShowInfoTitle">
                    New York | USA
                </span>
                </div>
                
            </div>
        </div>
        <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form  className="userUpdateForm">
                <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                        <label >Username</label>
                        <input name="username" type="text" placeholder={product.username} className="userUpdateInput"  onChange={handleChange}/>

                    </div>
                    <div className="userUpdateItem">
                        <label >Full Name</label>
                        <input  type="text" placeholder="Anna Becker" className="userUpdateInput"  onChange={handleChange}/>
                        
                    </div>
                    <div className="userUpdateItem">
                        <label >Email</label>
                        <input name="email" type="text" placeholder={product.email}className="userUpdateInput" onChange={handleChange}/>
                        
                    </div>
                    <div className="userUpdateItem">
                        <label >Phone</label>
                        <input type="text" placeholder="+1 123 456 78" className="userUpdateInput" onChange={handleChange}/>
                        
                    </div>
                    <div className="userUpdateItem">
                        <label >adress</label>
                        <input type="text" placeholder="New York | USA" className="userUpdateInput" onChange={handleChange}/>
                        
                    </div>
                </div>
                <div className="userUpdateRight">
                    Edit Picture
                    <div className="userUpdateUpload">
                        <img src={product.img} alt="" className="userUpdateImg" />
                        <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                        <input type="file" hidden id='file'   onChange={e => setFile(e.target.files[0])}/>
                    </div>
                    <button className="userUpdateButton" onClick={handleClick}>Update</button>
                </div>
            </form>
        </div>

       </div>
        </div>
  )
}

export default User