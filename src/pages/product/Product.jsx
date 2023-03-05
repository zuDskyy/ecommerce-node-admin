import "./product.css";
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { userRequest } from "../../requestMethods";
import { useEffect } from "react";
import { updateProduct } from "../../redux/apiCalls";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import app from '../../firebase';

function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const product = useSelector((state) =>
  state.product.products.find((product) => product._id === productId)
);

const [inputs, setInputs] = useState({});
const [file,setFile] = useState(null)
const dispatch = useDispatch()

const handleChange = (e) => {
  setInputs(prev => {
    return {...prev, [e.target.name] : e.target.value}
  })
}
  const MONTHS  = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  )
  const handleClick = (e) =>{
    e.preventDefault();
    const fileName = new Date().getTime()  + file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName)

  const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
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
  const products = {...inputs, img: downloadURL}
  updateProduct(product._id,  products, dispatch)
  
  
});

}

);

}


  useEffect(() => {
    const getStats = async () => {
        try{
          const res = await userRequest.get('/orders/income?pid=' + productId);
          const list = res.data.sort((a,b) => {
            return a._id - b._id
          })
          list.map(item => 
            setPStats(prev => [
              ...prev,
              {name:MONTHS[item._id - 1], Sales : item.total},
            ])
          )
        }catch(err){console.log(err)}
        
    }
    getStats();
  },[productId, MONTHS]);
  
 
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={pStats}
            datakey="Sales"
            title={"Sales Performance"}
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label htmlFor="">Product name</label>
            <input  type="text" placeholder={product.title}  onChange={handleChange}/>
            <label htmlFor="">Product Description</label>
            <input type="text" placeholder={product.desc}  onChange={handleChange}/>
            <label htmlFor="">Price</label>
            <input name="price" type="text" placeholder={product.price}  onChange={handleChange}/>
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" hidden  onChange={e => setFile(e.target.files[0])}/>
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Product;
