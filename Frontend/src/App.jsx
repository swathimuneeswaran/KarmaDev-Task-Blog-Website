import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import CreatePost from './components/Home/CreatePost';
import EditPost from './components/Home/EditPost';



const App = () => {
  return (
    <>
     <BrowserRouter>
   <Routes>
    <Route path="/" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/home" element={<Home />}></Route>
    <Route path="/create" element={<CreatePost />}></Route>
    <Route path="/edit/:id" element={<EditPost />}></Route>
   
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App