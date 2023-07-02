import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUserStart,
  getUserFailure,
  getUserSuccess,
  updateUserStart,
  updateUserSucces,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  logOut,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
export const login = async (user ,dispatch) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const logout = async (dispatch) => {
 dispatch(logOut());

}

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
export const updateUser = async ( id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}` , user)
    dispatch(updateUserSucces(res.data));
    return res.data;
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (user,dispatch) =>{
  dispatch(addUserStart());
  try{
    const res = await userRequest.post('/auth/register', user);
    dispatch(addUserSuccess(res.data));
    return res.data;
  }catch(err){
   dispatch(addUserSuccess())
  }
}
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}` )
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product );
    dispatch(updateProductSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    return res.data
  } catch (err) {
    dispatch(addProductFailure());
  }
};
