import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateProductApi } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditProduct({setProductToEdit,setProductUpdateStatus}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        handleCancel()
    };
    const handleShow = () => setShow(true);
    const [selectedProduct,setSelectedProduct]=useState({
        name:setProductToEdit.name,
        category:setProductToEdit.category,
        price:setProductToEdit.price,
        stock:setProductToEdit.stock,
        description:setProductToEdit.description
    })

    const handleCancel=()=>{
        setSelectedProduct({
            name:setProductToEdit.name,
            category:setProductToEdit.category,
            price:setProductToEdit.price,
            stock:setProductToEdit.stock,
            description:setProductToEdit.description
        })
      }

   const handleUpdate=async()=>{
     const {id,name,category,price,stock,description}=selectedProduct
    
            if(!name || !category || !price || !stock || !description){
              toast.info("Please fill the form completely")
            }
            else{
                const result=await updateProductApi(setProductToEdit.id,selectedProduct)
                console.log(result);
                if(result.status>=200 && result.status<300){
                    setProductUpdateStatus(result)
                }
                toast.success("Product Updated Successfully")
                handleClose()
                
   }
}
    
  

   
  return (
    <>
    <button onClick={handleShow}  className='btn btn-primary p-3'><FontAwesomeIcon icon={faPenToSquare} /></button>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='p-2'>
                <input type="text" value={selectedProduct.name} onChange={(e)=>setSelectedProduct({...selectedProduct,name:e.target.value})} placeholder='product name' className='form-control' />
                <input type="text"  onChange={(e)=>setSelectedProduct({...selectedProduct,category:e.target.value})} value={selectedProduct.category} placeholder='category'  className='form-control mt-4' />
                <input type="number" onChange={(e)=>setSelectedProduct({...selectedProduct,price:e.target.value})} value={selectedProduct.price} placeholder='price'  className='form-control mt-4' />
                <input type="number" onChange={(e)=>setSelectedProduct({...selectedProduct,stock:e.target.value})} value={selectedProduct.stock} placeholder='stock quantity' className='form-control mt-4' />
                <textarea name="" onChange={(e)=>setSelectedProduct({...selectedProduct,description:e.target.value})} value={selectedProduct.description} placeholder='Description'  className='form-control mt-4' id=""></textarea>


            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
            <ToastContainer position='top-right' theme='dark' autoClose={3000} />
      
    </>
  )

}
export default EditProduct