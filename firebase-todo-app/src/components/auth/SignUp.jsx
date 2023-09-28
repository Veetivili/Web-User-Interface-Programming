import React, {useState} from "react";
import {auth} from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const SignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then ((userCredential) => {
      console.log(userCredential);
        navigate("/auth")
    }) .catch((error) => {
      console.log(error);
    })

  }

  return (
    <div className="sign-in-container">
      <form onSubmit={SignUp}>
        <h2>Create user account</h2>

          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

          <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;