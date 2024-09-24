import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user, "login successfull")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }




    //signIn with popup

    const handleSigninWithGooglePopup = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token)
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                console.log(email)
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                // ...
            });
    }

    // signout method
    const handleSignout = () => {
        const auth = getAuth();
        signOut(auth).then((res) => {
            // Sign-out successful.
            console.log("signout successfull", res, auth)
        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin} >
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" /> <br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" /> <br />
                <button  >Login</button>
            </form>

            <button onClick={handleSigninWithGooglePopup} >
                SignIn with google
            </button>

            <button onClick={handleSignout} >Sign out</button>
        </div>
    )
}
