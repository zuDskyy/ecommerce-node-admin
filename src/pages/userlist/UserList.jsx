import './userlist.css'
import {DataGrid} from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import {userRows} from '../../dummydData'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/apiCalls';


function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users)
 

    const handleDelete = (id) => {
     
    }
    useEffect(() => {
      getUsers(dispatch)
     },[dispatch])

     
    const columns = [
        { field: '_id', headerName: 'ID', width: 130 },
        {
          field: 'username',
          headerName: 'User',
          width: 200,
          renderCell:(params) =>{
            return (<div className="userListUser">
                   <img className="userListImg" src={params.row.img} alt=''/>
                   {params.row.username}
            </div>)
          },
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: true,
        },
        
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell:(params) =>{
                return(
                    <>
                    <Link to={"/user/" + params.row._id}>
                <button className="userListEdit">Edit</button>
                </Link>
                <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
                </>
                )
            }
        }
      ];
      
      
  return (
    <div className='userList'>
 <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  )
}

export default UserList