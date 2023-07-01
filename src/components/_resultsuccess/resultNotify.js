
import React from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const ResultNotify = ({result}) => {

  return (
    <div>
      { result === "ok" &&  <p>Edit  Uploaded Successfully!</p>}
      { result === "error" &&  <p>Edit  Not  Uploaded Successfully!</p>}
      { result === "empty" &&  <p>Value is Empty !  Please specify in the field to be changed</p>}
   </div>
  )
}

 export  const getResultnotify = (notify) => {
      if(notify === "ok"){
        toast.success(<ResultNotify result={notify}/>, {
          position: toast.POSITION.BOTTOM_RIGHT,
          draggable:true
        });
      }
      if(notify === "error"){
        toast.error(<ResultNotify result={notify}/>, {
          position: toast.POSITION.BOTTOM_RIGHT,
          draggable:true
        });
      }
      if(notify === "empty"){
        toast.warn(<ResultNotify result={notify}/>, {
          position: toast.POSITION.BOTTOM_RIGHT,
          draggable:true
        });
      }
       } 




