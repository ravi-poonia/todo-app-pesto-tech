import React, { useState, useRef, useEffect } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface ToDoItemProps {
  id: string;
  title: string;
  description: string;
  status: string;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    title: string,
    description: string,
    status: string
  ) => void;
}

const ToDoItem = (props: ToDoItemProps) => {
  const { id, title, description, status, onDelete, onUpdate } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editStatus, setEditStatus] = useState(status);

  const handleSave = () => {
    onUpdate(id, editTitle, editDescription, editStatus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditDescription(description);
    setEditStatus(status);
  };

  return (
    <ListItem>
      <ListItemText
        primary={
          isEditing ? (
            <TextField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
          ) : (
            title
          )
        }
        secondary={
          isEditing ? (
            <div>
              <TextField
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
              />
              <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <>
              {description} <br />
              Status: {status}
            </>
          )
        }
      />
      <ListItemSecondaryAction>
        {isEditing ? (
          <>
            <IconButton onClick={handleSave} sx={{ color: "green" }}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} sx={{ color: "red" }}>
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ToDoItem;
