import React from "react";
import {
  List,
  Divider,
  MenuItem,
  Select,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddToDo from "./AddToDo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteTodo, updateTodo } from "./slices/todoSlice";

const ToDoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [filterStatus, setFilterStatus] = React.useState<string>("All");
  const dispatch = useDispatch();

  const deleteToDo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const updateToDo = (
    id: string,
    title: string,
    description: string,
    status: string
  ) => {
    dispatch(updateTodo({ id, title, description, status }));
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value as string);
  };

  const filteredTodos =
    filterStatus === "All"
      ? todos
      : todos.filter((todo) => todo.status === filterStatus);

  return (
    <div
      style={
        {
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
        } as React.CSSProperties
      }
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5">To-Do List</Typography>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          displayEmpty
          sx={{ minWidth: "150px" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </Box>
      <AddToDo resetFilter={setFilterStatus} />
      <Divider style={{ margin: "20px 0" } as React.CSSProperties} />
      <List>
        {filteredTodos.map((todo) => (
          <ToDoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            onDelete={deleteToDo}
            onUpdate={updateToDo}
          />
        ))}
      </List>
    </div>
  );
};

export default ToDoList;
