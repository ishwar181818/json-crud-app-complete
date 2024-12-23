import axios from 'axios';
import React, { useEffect } from 'react'
import { get, useForm } from 'react-hook-form'
import { useParams,useNavigate   } from 'react-router-dom';

function AddProduct() {
 const {register , handleSubmit , reset , setValue}  = useForm();
      const {id} =useParams();
      const navigate = useNavigate(); 
 
 const getEditData =() =>{
    if(id)
    {
      axios.get(`http://localhost:5000/products/${id}`)
           .then(res=>{
               for(let prop in res.data)
               {
                 setValue(prop ,res.data[prop])
               }
           })
    }
   
 }
                   // state variable
                   useEffect(() => {
                    if (id) {
                      getEditData();
                    } else {
                      reset();  // Ensure the form is reset (blank) when adding a new product
                    }
                  }, [id, reset]);


 const saveProduct = product => {
  if(!id){

    axios.post('http://localhost:5000/products' , product)
         .then(res=>{
            if(res.status===201){
               alert("Product Add to inventory..!")

            }
         })
         .catch(error=>alert(error.message));
    }
    else{
      
      axios.put(`http://localhost:5000/products/${id}` , product)
          .then(res=>{
            if(res.status===200)
            {
              alert('product updated..!')

              navigate('/view');
              
            }
          })
    } 
    reset();    
 }

  return (
    <div className='d-flex justify-content-center'>
          <div className='w-50 card mt-4 p-3'>
              <h1 className='text-center fs-3'>
                <i className="bi bi-shop"></i>
                {(id)? 'Update Existing Product..!' :' Add new product..!'}
              </h1>
              <form onSubmit={handleSubmit(saveProduct)}>
                  <div>
                    <label className='form-label'>Enter Product Name:</label>
                    <input type='text' className='form-control' {...register('productName')}></input>
                  </div>
                  <div>
                    <label className='form-label'>Enter Product Description:</label>
                    <input type='text' className='form-control' {...register('description')}></input>
                  </div>
                  <div>
                    <label className='form-label'>Enter Product Manufacturer:</label>
                    <input type='text' className='form-control' {...register('manufacturer')}></input>
                  </div>
                  <div>
                    <label className='form-label'>Enter Product Price:</label>
                    <input type='number' className='form-control' {...register('price')}></input>
                  </div>
                  <div>
                    <label className='form-label'>Enter Product Stock:</label>
                    <input type='number' className='form-control' {...register('availableStock')}></input>
                  </div>
                  <div className='mt-3'>
                    <label className='form-check-label me-4'>Is Product  Available ?</label>
                    <input type='checkbox' className='form-check-input' {...register('isAvailable')}></input>
                  </div>
                  <div className='mt-3'>
                    <button type='submit' className='btn btn-success'>Submit</button>
                  </div>
                  
              </form>

          </div>
    </div>
  )
}

export default AddProduct