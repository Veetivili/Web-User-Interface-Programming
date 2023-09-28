import React, {useState} from "react";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function Landing() {
    const [isAlreadyUser, setIsAlreadyUser] = useState(false);
    const [value, setValue] = useState("I don't have an account");

    const makeSelection = () => {
        isAlreadyUser ? setIsAlreadyUser(false) : setIsAlreadyUser(true);
        if (!isAlreadyUser) {
            setValue("I already have an account");
        }
    }

    return (
        <div>
            <h1>Landing</h1>
            <h2>Sign In or Sign Up</h2>
            <button onClick={makeSelection}>{value}</button>
            {isAlreadyUser ? <SignUp /> : <SignIn />}
        </div>
    );
}

export default Landing;
