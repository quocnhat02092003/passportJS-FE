import React from "react";
import Register from "./component/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import "./style.css"
import UploadBlog from "./component/UploadBlog";
import MyBlog from "./component/MyBlog";
import MyAccount from "./component/MyAccount";
import EditBlog from "./component/EditBlog";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/upload-blog" element={<UploadBlog/>}> </Route>
      <Route path="/my-blog" element={<MyBlog/>}></Route>
      <Route path="/my-account" element={<MyAccount/>}></Route>
      <Route path="/edit/:id" element={<EditBlog/>}></Route>
    </Routes>
  );
}

export default App;
