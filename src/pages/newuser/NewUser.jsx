import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";
import {ToastContainer, toast } from "react-toastify";
import "./newuser.css";
import { getResultnotify } from "../../components/_resultsuccess/resultNotify";


import { Publish } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [newUserUploadedSuccess , setNewUserUploadedSuccess] = useState(null);
  const [newUserUploadedError, setNewUserUploadedError] = useState(null);
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

    if(file){
      try{
      const datafile = new FormData();
      datafile.append("name" , Date.now() + file.name);
      datafile.appent("file", file, file.type)
      const res = await userRequests.post('/user/profilePicture', filedata)
       setNewUserUploadedSuccess(res.data)
      const user = {password, username,email, img: res?.data.filename}
      addUser(user,dispatch)
    }catch(err){
      setNewUserUploadedError(err)
    }

  }else{
    try{
    const user = {password, username,email}
    addUser(user,dispatch).then(data => setNewUserUploadedSuccess(data));
  }catch(err){
     setNewUserUploadedError(err);
  }
  }

     if(password === "" || username  ===  "" || email === ""){
        return getResultnotify("empty");
     }


);



  //success error message
   useEffect(() => {
    if(newUserUploaderSuccess){
     return  getResultnotify("ok");
    }

    if(newUserUploadedError){
      return getResultnotify("error");
    }


  },[newUserUploadedSuccess, newUserUploadedError])

  useEffect(()=> {
    if(newUserUploadedSuccess){
      setTimeOut(() => {
         setNewUserUploadedSuccess(null);
         setNewUserUploadedError(null);
         window.location.reload();
      }, 2000)
    }

  },[newUserUploadedSuccess]);

  return (
    <div className="newUser">
     <ToastContainer/>
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
