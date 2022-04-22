
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'

import Login from './component/login/Login'
import Signup from './component/signup/Signup'
import Home from './component/home/home';
import Event from './component/event/Event'
import Trip from './component/trips/Trip';
import Product from './component/products/Product'
import ProductCategory from './component/products/prod-Category/category';
import { UserContext  } from './Context';
import Post from './component/post/post'
import Navbar  from './component/shared/navbar/navbar';
import ProductView from './component/products/product-view/view'
import Test from './component/test_folder/test';
import JobAdd from './component/jobs/add/add'
import JobList from './component/jobs/list/list';
import ViewJob from './component/jobs/view/view';



function App() {
  const [ user , setUser ] = useState({})

  useEffect(()=>{
    let userData =JSON.parse( localStorage.getItem('userInfo') ) 
    setUser( userData ?? {});
  },[])
  return (
    <div className="App">
      {/* <UserContext.Provider value={{user}}> */}
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/post' element={<Post />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/event' element={<Event />}></Route>
          <Route path='/trip' element={<Trip />}>  </Route>
          <Route path='/category' element={<ProductCategory />} ></Route>
          <Route path='/products/:id' element={<Product />} ></Route>
          <Route path='/product/view/:id' element={ <ProductView/> }></Route>
          <Route path='/nav' element={ <Navbar/> }> </Route>
          <Route path='/test' element={ <Test/> }> </Route>
          <Route path='/job/add' element={ <JobAdd/> }> </Route>
          <Route path='/jobs' element={ <JobList/> }> </Route>
          <Route path='/jobs/view/:id' element={ <ViewJob/> }> </Route>
        </Routes>
      {/* </UserContext.Provider> */}




    </div>
  );
}

export default App;
