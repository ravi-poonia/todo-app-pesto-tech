import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../db/firebaseConfig";
import styles from "./Login.module.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((userCredential) => {
        setSubmitButtonDisabled(false);
        console.log("User signed in:", userCredential.user);
        navigate("/todos");
      })
      .catch((error) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(error.message);
      });
  };

  return (
    <Container className={styles.container}>
      <div className={styles.innerBox}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

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
            Login
          </Button>
          <Typography variant="body2" className={styles.signupLink}>
            Don't have an account? <Link to="/">Sign up</Link>
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default Login;
