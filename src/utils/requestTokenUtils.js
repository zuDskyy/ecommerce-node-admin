import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
export const userRequest = axios.create({
  baseURL: BASE_URL,
});

export const __updateUserRequestHeaders = (token) => {
  userRequest.defaults.headers.common["token"] = `Bearer ${token}`;
};


const RequstUtils = { 
    _getCreatedUsersStats : async() => {
        try{
            const res = await userRequest.get('/users/stats')
            return res.data
        }catch(err){

        }
    } ,
    _getRegisterUsersByUsername :async () => {
        try{
            const res= await userRequest.get("users/?new=true")
            return res.data
        }catch(err){

        }
    },
    _getOrdersByUSerId : async() => {
        try{
            const res = await userRequest.get("/orders")
            console.log(res.data)
            return res.data
        }catch(err){

        }
    }
}


export const {_getCreatedUsersStats,_getRegisterUsersByUsername,_getOrdersByUSerId} = RequstUtils;