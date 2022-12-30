import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Main } from "./pages/main/main";
import { About } from "./pages/about";
import { Login } from "./pages/login";
import { CreatePost } from "./pages/create-post/create-post";

function App() {
  return (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
