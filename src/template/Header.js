import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className='bg-primary d-flex justify-content-between p-2'>
       <h1 className='text-white fs-2'>My Store App</h1>
       <div >
         <Link className='btn btn-light me-5' to={'/add'}>Add Product</Link>
         <Link className='btn btn-light'  to={'/view'}>View Product</Link>
         {/* <Link className='btn btn-light'  to={'/delete'}>Delete Product</Link> */}
         
       </div>
    </nav>
  )
}

export default Header