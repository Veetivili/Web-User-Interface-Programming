import React, {useState} from "react";
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const SignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then ((userCredential) => {
      console.log(userCredential);
      navigate("/auth")
    }) .catch((error) => {
      console.log(error);
    })

  }

  return (
    <div className="sign-in-container">
      <form onSubmit={SignIn}>
        <h2>Sign In to Account</h2>

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

          <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;