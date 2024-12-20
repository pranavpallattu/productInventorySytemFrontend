import React, { useEffect, useState } from 'react'
import Add from '../components/Add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteProductApi, getProductApi } from '../services/allApis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from '../components/EditProduct'





function Home() {

    const [allProductDetails,setAllProductDetails]=useState([])

    const [allProductDetailsStatus,setAllProductDetailsStatus]=useState({})

    const [deleteProductStatus,setDeleteProductStatus]=useState({})

    const [productToEdit,setProductToEdit]=useState("")

    const [productUpdateStatus,setProductUpdateStatus]=useState("")

    const [filterByCategory,setFilterByCategory]=useState('')

    const [displayProducts,setDisplayProducts]=useState([])

    
    const handleSearch=(e)=>{
       const value=e.target.value.toLowerCase();
       setFilterByCategory(value)
        if(value===''){
            setDisplayProducts(allProductDetails)
        }
        else{
            const filteredproducts=allProductDetails?.filter((product)=>product?.category?.toLowerCase().includes(value));
            setDisplayProducts(filteredproducts)
        }

        }
    
    
    


    const handleDelete=async(id)=>{
        const result=await deleteProductApi(id)
        console.log(result);
        if(result.status>=200 && result.status<300){
            setDeleteProductStatus(result)
        }
        toast.success('Product Deleted Successfully')
        
    }

   

   const getAllProducts=async()=>{
    const result=await getProductApi()
    // console.log(result.data);
    setAllProductDetails(result.data)
    setDisplayProducts(result.data)
   }
    
   useEffect(() => {
    getAllProducts();
}, [allProductDetailsStatus,deleteProductStatus,productUpdateStatus]);



  return (
    <>
    <div className="container-fluid p-3" style={{height:'100vh',backgroundColor:'white'}}>
        <h1 className='text-center text-warning'>Product Inventory System</h1>
            <div className='container-fluid'>
                <div className="row my-5">
                    <div className="col-md-4">
                    <Add setAllProductDetailsStatus={setAllProductDetailsStatus}/>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 mt-1">
                    <input type="text" value={filterByCategory} placeholder='search by category' onChange={handleSearch} className='form-control' />
                    </div>
                </div>
               
                </div>

                <div
  style={{ height: '100vh' }}
  className="container-fluid bg-dark rounded border shadow"
>
  <h1 className="text-center text-warning mt-5">Product Details</h1>

  <div className="row mt-5 justify-content-center">
    <div className="col-12 table table-responsive shadow-sm rounded">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center text-bold fs-5">Si no</th>
            <th className="text-center text-bold fs-5">Name</th>
            <th className="text-center text-bold fs-5">Category</th>
            <th className="text-center text-bold fs-5">Price</th>
            <th className="text-center text-bold fs-5">Stock Quantity</th>
            <th className="text-center text-bold fs-5">Description</th>
            <th className="text-center text-bold fs-5">Edit</th>
            <th className="text-center text-bold fs-5">Delete</th>
          </tr>
        </thead>
        <tbody>
          {displayProducts?.map((item, index) => (
            <tr key={item?.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item.name}</td>
              <td className="text-center">{item?.category}</td>
              <td className="text-center">${item?.price}</td>
              <td className="text-center">{item?.stock}</td>
              <td className="text-center">{item?.description}</td>
              <td className="text-center">
                <EditProduct
                  setProductToEdit={item}
                  setProductUpdateStatus={setProductUpdateStatus}
                />
              </td>
              <td className="text-center">
                <button
                  onClick={() => handleDelete(item?.id)}
                  className="btn btn-danger p-3"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


    </div>

                 <ToastContainer position='top-right' theme='dark' autoClose={3000} />
           
    </>
  )
}

export default Home