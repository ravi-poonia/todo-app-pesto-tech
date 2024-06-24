import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import ToDoList from "./components/ToDoList";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <Container sx={{ textAlign: "center", paddingTop: "2rem" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ marginBottom: "2rem" }}
        >
          ToDo List
        </Typography>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<ToDoList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
