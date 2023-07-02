import { Fragment, useEffect, useState } from "react";
import "./newproduct.css";
import { Button, Typography } from "@mui/material";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { userRequest } from "../../requestMethods";
import {ToastContainer, toast } from "react-toastify";
import { getResultnotify } from "../../components/_resultsuccess/resultNotify";
const ASSETS = process.env.REACT_APP_ASSETS_IJORDAN;
function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [showImageFilewithblob, setShowImageFilewithblob] = useState(null);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUploadError,setFileUploadError] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "price" && e.target.value <= 0) {
      return;
    }
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleUploadProductImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileType = selectedFile.type;

      const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];

      if (!allowedTypes.includes(fileType)) {
        e.target.value = null;
        setFile(null);
        return;
      }
    }
  };

  useEffect(() => {
    if (file) {
      const blob = URL.createObjectURL(file);
      setShowImageFilewithblob(blob);
    }
  }, [file]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (file) {
      const datafile = new FormData();
      datafile.append("name", Date.now() + file.name);
      datafile.append("file", file, file.type);

      try {
        const res = await userRequest.post("/upload/productassets", datafile);
        setFileUploadSuccess(res.data);
        const product = { ...inputs, img: res.data.filename, categories: cat };
        await addProduct(product, dispatch);

      } catch (err) {
       setFileUploadError(err);
      }
    }
    if(!file && Object.keys(inputs).length === 0){
    return   getResultnotify("empty")
    }
  };

  useEffect(() => {
    if(fileUploadSuccess){
    setTimeout(() => {
      setFileUploadSuccess(null);
      setFileUploadError(null);
      window.location.reload();
    }, 2000);
  }
}, [fileUploadSuccess]);
 useEffect(() => {
    if(fileUploadSuccess){
    return   getResultnotify("ok")
    }

     if(fileUploadError){
    return   getResultnotify("error")
     }
 },[fileUploadError,fileUploadSuccess])
  return (
    <div className="newProduct" style={{ display: "flex" }}>
      <form className="addProductForm">
        <h1 className="addProductTitle">New Product</h1>
        <div className="addProductItem">
          <label
            htmlFor="file"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            Image *
            <span
              style={{
                padding: 8,
                outline: "none",
                fontSize: 16,
                width: "60%",
                textAlign: "center",
                margin: "0px auto",
                background: "rgb(0,0,0,0.5)",
                color: "white",
                textShadow: "0 0 3px #FF0000",
                borderRadius: 8,
              }}
            >
              Upload Image
            </span>
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => handleUploadProductImage(e)}
            accept="image/*"
            hidden
          />
        </div>
        <div className="addProductItem">
          <label>Title*</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description *</label>
          <input
            name="desc"
            type="text"
            placeholder="desc..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price *</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories *</label>
          <select name="inStock" id="" onChange={handleCat}>
            <option value="jeans">jeans</option>
            <option value="tshirt">t-shirt</option>
            <option value="shoes">shoes</option>
            <option value="sneakers">sneakers</option>
            <option value="jacket">jacket</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock *</label>
          <select name="inStock" id="" onChange={handleChange}>
            <option value="true">YES</option>
            <option value="false">NO</option>
          </select>
        </div>

        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    <ToastContainer/>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {file && (
          <span style={{ display: "flex" }}>
            <img
              width={500}
              height={500}
              style={{
                borderRadius: "25px",
                objectFit: "contain",
                background: "rgb(0,0,0,0.3)",
                boxShadow: " 0 0 5px 5px white",
                WebkitBoxShadow: "0 0 20px rgba(250,250,250,0.3)",
              }}
              src={showImageFilewithblob}
              alt=""
            />
            <span
              onClick={() => setFile(null)}
              style={{ fontSize: 18, color: "blue" }}
            >
              <img
                width="50"
                height="50"
                src={ASSETS + "/closeimage.png"}
                alt=""
              />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default NewProduct;
