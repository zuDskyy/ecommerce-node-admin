import "./product.css";
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import {ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { userRequest } from "../../requestMethods";
import { useEffect } from "react";
import { getProducts, updateProduct } from "../../redux/apiCalls";
import "react-toastify/dist/ReactToastify.css";
import { getResultnotify } from "../../components/_resultsuccess/resultNotify";








function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const product = useSelector((state) =>
  state.product.products.find((product) => product._id === productId)
);

const [inputs, setInputs] = useState({});
const [file,setFile] = useState(null)
const [getEditSuccess,setGetEditSuccess] = useState(null);
const [getEditError,setGetEditError] = useState(false);
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
  const handleUpdateProduct = async (e) =>{
    e.preventDefault();
   
if(file){
   const filedata = new FormData();
   filedata.append("name", Date.now()  + file.name);
   filedata.append("file", file, file.type);


   try{
    const res = await userRequest.post("/upload/productassets", filedata);
      
  const products = {...inputs, img: res?.data.filename}
 updateProduct(product._id,  products, dispatch);
 getProducts(dispatch);
  setGetEditSuccess(res.data);
   }catch(err){
   getEditError(true);
   }
}else{
  try{
    if(Object.keys(inputs).length !== 0){
  updateProduct(product._id,  {...inputs}, dispatch).then(
    data =>  setGetEditSuccess(data)
  );
  getProducts(dispatch);

 }
  }catch(err){
    getEditError(true);
  }
 
}
 if(Object.keys(inputs).length === 0){
    return getResultnotify("empty");
  }
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
        }catch(err){
          console.log(err)
        }
        
    }
    getStats();
  },[productId, MONTHS]);

 

//success error message
 useEffect(() => {
  if(getEditSuccess  ){
   return  getResultnotify("ok");
  }
  
  if(getEditError){
    return getResultnotify("error");
  }
  
 
 },[getEditSuccess, getEditError])

useEffect(() => {
  if(getEditSuccess || getEditError){
  setTimeout(() => {
     setGetEditSuccess(null);
     setGetEditError(null);
     setInputs(null);
     window.location.reload();
  }, 1000);
}
},[getEditSuccess,setGetEditError])

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
            <label htmlFor="" >Product name</label>
            <input  type="text" name="title" placeholder={product.title}  onChange={handleChange}/>
            <label htmlFor="" >Product Description</label>
            <input type="text" name="desc" placeholder={product.desc}  onChange={handleChange}/>
            <label htmlFor="">Price</label>
            <input name="price" type="text" placeholder={product.price}  onChange={handleChange}/>
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
            <ToastContainer/>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" hidden  onChange={e => setFile(e.target.files[0])}/>
            </div>
            <button className="productButton" onClick={handleUpdateProduct}>Update</button>
          
          </div>
        </form>
      </div>
    </div>
  );
}

export default Product;
