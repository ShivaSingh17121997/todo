import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });

    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup} >
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" /> <br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" /> <br />
                <button >Signup</button>
            </form>
        </div>
    )
}
