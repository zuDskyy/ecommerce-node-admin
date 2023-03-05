import { DataGrid } from '@material-ui/data-grid'
import './productlist.css'
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {deleteProduct, getProducts} from '../../redux/apiCalls'


function ProductList() {
 
    const dispatch =  useDispatch();
    const products = useSelector(state => state.product.products)
     useEffect(() => {
      getProducts(dispatch)
     },[dispatch])
     
    const handleDelete = (id) => {
       deleteProduct(id, dispatch)
    }
    
    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
          field: 'product',
          headerName: 'Product',
          width: 200,
          renderCell:(params) =>{
            
            return (<div className="productListItem">
                   <img className="productListImg" src={params.row.img} alt=''/>
                   {params.row.title}
            </div>)
          },
          editable: true,
        },
        {
          field: 'inStock',
          headerName: 'Stock',
          width: 150,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 170,
        },
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell:(params) =>{
                return(
                    <>
                    <Link to={"/product/" + params.row._id}>
                <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)}/>
                </>
                )
            }
        }
      ];
  return (
    <div className="productList"> 
    <DataGrid
        
        rows={products}
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  )
}

export default ProductList