import { commonApi } from "./commonApi";
import { serverUrl } from "./serverurl";

export const addProductApi=async(reqBody)=>{
   return await commonApi("POST",`${serverUrl}/products`,reqBody)
}

export const getProductApi=async()=>{
   return await commonApi("GET",`${serverUrl}/products`,"")
}

export const deleteProductApi=async(id)=>{
   return await commonApi("DELETE",`${serverUrl}/products/${id}`,{})
}

export const updateProductApi=async(id,reqBody)=>{
   return await commonApi("PUT",`${serverUrl}/products/${id}`,reqBody)
}