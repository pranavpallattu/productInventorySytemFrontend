import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProductApi } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setAllProductDetailsStatus}) {

    const[productDetails,setProductDetails]=useState({
        name:'',
        category:'',
        price:'',
        stock:'',
        description:''

    })
    console.log(productDetails);

    const handleAdd=async()=>{
        const {name,category,price,stock,description}=productDetails

        if(!name || !category || !price || !stock || !description){
          toast.info("Please fill the form completely")
        }
        else{
          const result=await addProductApi(productDetails)
          console.log(result);
          if(result.status>=200 && result.status<300){
            setAllProductDetailsStatus(result)
            toast.success("product added successfully")
            handleClose()
          }
         else{
          toast.error("something went wrong")
          handleCancel()
         }
          
        }
    }
    

    const [show, setShow] = useState(false);

    const handleCancel=()=>{
      setProductDetails({
        name:"",
        category:"",
        price:"",
        stock:"",
        description:""
      })
      handleClose()
    }

    const handleClose = () => {
      setShow(false)
      handleCancel()
    }
    const handleShow = () => setShow(true);
  return (
    <>
    <h2 className='text-center mb-lg-0 mb-3'>Add New Product <FontAwesomeIcon className='text-success' onClick={handleShow} icon={faCartPlus} /></h2>
 

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='p-2'>
                <input type="text" onChange={(e)=>setProductDetails({...productDetails,name:e.target.value})} value={productDetails.name} placeholder='product name' className='form-control' />
                <input type="text" placeholder='category' value={productDetails.category} onChange={(e)=>setProductDetails({...productDetails,category:e.target.value})} className='form-control mt-4' />
                <input type="number" placeholder='price' value={productDetails.price} onChange={(e)=>setProductDetails({...productDetails,price:e.target.value})} className='form-control mt-4' />
                <input type="number" placeholder='stock quantity' value={productDetails.stock} onChange={(e)=>setProductDetails({...productDetails,stock:e.target.value})} className='form-control mt-4' />
                <textarea name="" placeholder='Description' value={productDetails.description} onChange={(e)=>setProductDetails({...productDetails,description:e.target.value})} className='form-control mt-4' id=""></textarea>


            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-right' theme='dark' autoClose={3000} />
    </>

  )
}

export default Add