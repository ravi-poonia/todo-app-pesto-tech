import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoList from "./components/ToDoList";
import Login from "./components/login/Login";
import Register from "./components/signup/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<ToDoList />} />
      </Routes>
    </Router>
  );
};

export default App;
