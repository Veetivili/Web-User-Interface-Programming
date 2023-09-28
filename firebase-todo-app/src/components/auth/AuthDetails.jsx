import React, {useEffect, useState} from "react";
import {auth} from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import App from "../../App";
import { useNavigate } from "react-router-dom";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();
   

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            user ? setAuthUser(user) : setAuthUser(null);
        });
        return () => {
            listen();
        };
        
    }, []);

    const userSignOut = () => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
        signOut(auth)
          .then(() => {
            console.log("Signed Out Successfully");
          })
          .catch(error => console.log(error));
      };

    return (
        <div>
            { authUser ? 
            <>
            <p>{`Signed In as: ${authUser.email}`}</p>
            <App />
            <button onClick={() => userSignOut()}>Sign Out</button>
            </> : <p>Signed Out</p> }
        </div>
    )
};

export default AuthDetails;
