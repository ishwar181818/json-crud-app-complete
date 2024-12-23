import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './template/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';




function App() {
  return (
    <div>
      <BrowserRouter>
            <Header/>
            <Routes>
               <Route path='/' element={<ViewProduct/>}></Route>
               <Route path='add' element={<AddProduct/>}></Route>
              <Route path='view' element={<ViewProduct/>}></Route>
              {/* <Route path='delete' element={<DeleteProduct/>}></Route> */}
              <Route path='edit/:id' element={<AddProduct/>}></Route>
              <Route path='del/:id' element={<ViewProduct/>}></Route>
              
              
            </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
