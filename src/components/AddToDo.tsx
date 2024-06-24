import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  styled,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { addTodo } from "../components/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  resetFilter: (status: string) => void;
}

const FixedButtonWrapper = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 1000,
});

const AddToDo = (props: IProps) => {
  const { resetFilter } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), title, description, status };
    dispatch(addTodo(newTodo));
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setIsOpen(false);
    resetFilter("All");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      selectRef.current &&
      typeof selectRef.current.contains === "function" &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <Box
          ref={containerRef}
          sx={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            zIndex: 1000,
            width: "300px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            padding: "16px",
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: "16px" }}
          />
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
              inputRef={selectRef}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Add ToDo
          </Button>
        </Box>
      ) : (
        <FixedButtonWrapper ref={containerRef}>
          <IconButton
            onClick={handleToggle}
            sx={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </FixedButtonWrapper>
      )}
    </>
  );
};

export default AddToDo;
