import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";


/* CHANGE THE API PATHS */

const HostAuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const usernameRef = useRef(null);
    const fullNameRef = useRef(null);
    const loginEmailRef = useRef(null);
    const loginPasswordRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const openLogin = () => {
        setIsSignUp(false); // Revert to login
    };

    const openSignup = () => {
        setIsSignUp(true); // Switch to sign-up
    };

    const triggerInvalidField = (fieldRef) => {
        fieldRef.current.classList.add("invalid");
        setTimeout(() => {
            fieldRef.current.classList.remove("invalid");
        }, 500); // Blink effect
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = loginEmailRef.current ? loginEmailRef.current.value : "";
        const password = loginPasswordRef.current ? loginPasswordRef.current.value : "";

        // Check for empty fields in login
        if (!email) triggerInvalidField(loginEmailRef);
        if (!password) triggerInvalidField(loginPasswordRef);

        if (email && password) {
            try {
                const response = await fetch("https://fake-api.com/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Login successful", data);
                    // Redirect or take appropriate action after successful login
                } else {
                    alert("Login failed");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            return;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const username = usernameRef.current ? usernameRef.current.value : "";
        const fullName = fullNameRef.current ? fullNameRef.current.value : "";
        const email = emailRef.current ? emailRef.current.value : "";
        const password = passwordRef.current ? passwordRef.current.value : "";
        const confirmPassword = confirmPasswordRef.current ? confirmPasswordRef.current.value : "";

        // Check for empty fields in signup
        if (!username) triggerInvalidField(usernameRef);
        if (!fullName) triggerInvalidField(fullNameRef);
        if (!email) triggerInvalidField(emailRef);
        if (!password) triggerInvalidField(passwordRef);
        if (!confirmPassword) triggerInvalidField(confirmPasswordRef);

        // Check if passwords match
        if (password !== confirmPassword) {

            triggerInvalidField(passwordRef);
            triggerInvalidField(confirmPasswordRef);
            return;
        }
        if (username && fullName && email && password && confirmPassword) {
            try {
                const response = await fetch("https://fake-api.com/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, fullName, email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Signup successful", data);
                    // Redirect or take appropriate action after successful signup
                } else {
                    alert("Sign up failed");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        }
        else {
            return;
        }
    };

    return (
        <div className="flex h-screen relative">
            {/* The Fill Box (moves left and right, color changes) */}
            <div
                className={`fill-box w-1/2 absolute z-50 top-0 bottom-0 transition-all duration-700 ${isSignUp ? "translate-x-[100%] bg-[var(--host-primary)]" : "bg-[var(--web-secondary)]"
                    }`}
            >
                <div className={`absolute text-white font-bold text-4xl ${isSignUp ? "right-8 bottom-8" : "top-8 left-8"}`} >
                    <Link to="/">{isSignUp ? "Host Impactful Events." : "Welcome, to the HQ!"}</Link>
                </div>
            </div>

            {/* Container for both Login and Signup Forms (positioned on left or right half) */}
            <div className={`w-1/2 flex justify-center items-center absolute top-0 bottom-0 ${!isSignUp ? 'right-0' : 'left-0'}`}>
                {/* Login Form */}
                <div
                    className={`card transition-all duration-400 absolute ${isSignUp ? "opacity-0 pointer-events-none" : "opacity-100 relative"}`}
                >
                    <button className="login" onClick={openLogin} style={{ cursor: "pointer" }}>
                        Log in
                    </button>
                    <div className="inputBox">
                        <input type="email" required ref={loginEmailRef} />
                        <span>Email</span>
                    </div>

                    <div className="inputBox">
                        <input type="password" required ref={loginPasswordRef} />
                        <span>Password</span>
                    </div>

                    <button className="enter" onClick={handleLogin}>Enter</button>
                    <p className="text-center text-sm cursor-pointer" onClick={openSignup}>
                        New Here? <span style={{ textDecoration: 'underline' }}>Sign Up</span>
                    </p>
                </div>

                {/* Sign Up Form (when SignUp is active) */}
                <div className={`card signup-card transition-all duration-400 absolute ${isSignUp ? "opacity-100 relative" : "opacity-0 pointer-events-none"}`}>
                    <button className="login" onClick={openLogin} style={{ cursor: "pointer" }}>
                        Sign Up
                    </button>

                    <div className="form-grid">
                        <div className="inputBox">
                            <input type="text" required placeholder="e.g. Mike" name="username" ref={usernameRef} />
                            <span>Username</span>
                        </div>

                        <div className="inputBox">
                            <input type="text" required name="fullName" ref={fullNameRef} />
                            <span>Full Name</span>
                        </div>

                        <div className="inputBox full-width">
                            <input type="email" required name="email" ref={emailRef} />
                            <span>Email</span>
                        </div>

                        <div className="inputBox">
                            <input type="password" required name="password" ref={passwordRef} />
                            <span>Password</span>
                        </div>

                        <div className="inputBox">
                            <input type="password" required name="confirmPassword" ref={confirmPasswordRef} />
                            <span>Confirm Password</span>
                        </div>
                    </div>

                    <button className="enter" onClick={handleSignup}>Sign Up</button>
                    <p className="text-center text-sm cursor-pointer" onClick={openLogin}>
                        Have an Account? <span style={{ textDecoration: 'underline' }}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HostAuthPage;
