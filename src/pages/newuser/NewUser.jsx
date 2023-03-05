import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";
import app from '../../firebase';
import "./newuser.css";

import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { Publish } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [file,setFile] = useState(null)
  const navigate = useNavigate();
 
  const dispatch = useDispatch();

  
  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name] : e.target.value}
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
      const user = {password, username,email, img: downloadURL}
      addUser(user,dispatch)
      navigate('/users');
      
    });

  }
   
);
  
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">NewUser</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john"  onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>FullName</label>
          <input type="text" placeholder="John Smith" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label> Email</label>
          <input type="text" placeholder="john@exapmple.com"  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78"  onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Adress</label>
          <input type="text" placeholder="New York | USA"  onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender" onChange={handleChange}>
            <input type="radio" id="male" name="gender" value="male" />
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" value="female" />
            <label for="female">Female</label>
            <input type="radio" id="other" name="gender" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="avtive" id="active" onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="userUpdateUpload">
                        <img src="" alt="" className="userUpdateImg" />
                        <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                        <input type="file" hidden id='file'   onChange={e => setFile(e.target.files[0])}/>
                    </div>
        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
