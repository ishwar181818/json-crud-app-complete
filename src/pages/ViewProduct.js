import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link ,useNavigate, useParams} from 'react-router-dom';

function ViewProduct() {
  const [products,setProducts]=   useState([]);
  const { id } = useParams();  // Get the id from the URL
  const navigate = useNavigate();
  const getProducts= ()=>{
    axios.get('http://localhost:5000/products')
         .then(res=>{
            if(res.status===200)
            {
              setProducts(res.data)
            }
         })
         .catch(error=>alert(error.message))
  }
  // Handle product deletion if the id is found in the URL
  useEffect(() => {
    if (id) {
      // Perform the delete operation if an id is provided
      axios.delete(`http://localhost:5000/products/${id}`)
        .then(res => {
          if (res.status === 200) {
            alert('Product deleted successfully!');
            getProducts();  
            navigate('/view');  
          }
        })
        .catch(error => alert(error.message));
    }
  }, [id, navigate]);
   useEffect(getProducts,[]);
  return (
    <div className='mt-2'>
      <h1 className='text-primary text-center fs-2'>All Shop Products..!</h1>
      <table className='w-100'>
          <thead>
             <tr className='bg-dark text-white fs-5'>
               <th>ID</th>
               <th>Product Name</th>
               <th>Description</th>
               <th>Manufactured By</th>
               <th>Price</th>
               <th>Available Stock</th>
               <th>Is Available</th>
               <th>Actions</th>
             </tr>
          </thead>
          <tbody>
              {
                products.map((product)=><tr key={product.id} style={{
                  backgroundColor:(product.isAvailable)? 'lightgreen':'red'
                }}>
                      <td>{product.id}</td>
                      <td>{product.productName}</td>
                      <td>{product.description}</td>
                      <td>{product.manufacturer}</td>
                      <td>{product.price}</td>
                      <td>{product.availableStock}</td>
                      <td>
                        <input type='checkbox' className='form-check-input' checked={product.isAvailable}></input>
                      </td>
                      <th>
                          <Link className='btn text-primary' to={`/edit/${product.id}`}><i class="bi bi-pencil-square"></i></Link>
                          <Link className='btn text-danger ms-2' to={`/del/${product.id}`}><i className="bi bi-trash"></i> Delete </Link>
                         
                    
                      </th>
                </tr>)
              }
          </tbody>
      </table>
    </div>
  )
}

export default ViewProduct