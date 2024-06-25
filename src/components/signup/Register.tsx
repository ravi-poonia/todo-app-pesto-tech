import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../db/firebaseConfig";
import styles from "./Register.module.css";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.pass
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: values.name,
      });
      console.log("User registered:", user);
      navigate("/todos");
    } catch (error: any) {
      // Explicitly type error as any
      console.error("Error registering:", error);
      setErrorMsg(error.message);
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles.innerBox}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          value={values.name}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
          fullWidth
          margin="normal"
          placeholder="Enter your name"
        />
        <TextField
          label="Email"
          variant="outlined"
          value={values.email}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
          fullWidth
          margin="normal"
          placeholder="Enter email address"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={values.pass}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, pass: e.target.value }))
          }
          fullWidth
          margin="normal"
          placeholder="Enter password"
        />

        <div className={styles.footer}>
          <Typography variant="body2" className={styles.error}>
            {errorMsg}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
            fullWidth
          >
            Register
          </Button>
          <Typography variant="body2" className={styles.loginLink}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default Register;
