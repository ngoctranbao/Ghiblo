import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./home";
// import HomeLayout from "../../layouts/HomeLayout";
// import LinkCustom from "../../components/layout/LinkCustom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Post from "./post/post";
import PostList from "./postList/PostList";
import PostComponent from "./post/createPost";

const Guest = () => {
  return (
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/posts/:id" element={<Post/>} />
        <Route path="/posts/create" element = {<PostComponent/>} />
        <Route path="/*" element={<div>Chua dinh nghia</div>} />
      </Routes>
  );
};

export default Guest;
