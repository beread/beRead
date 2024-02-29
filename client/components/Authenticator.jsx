import React, { Component } from "react";
import { Router, Route, Routes, Link, BrowserRouter } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// import { toast } from "react-toastify";

import { useLoginMutation } from "../slices/api/userApiSlice";
import { setCredentials } from "../slices/reducers/authSlice";

const Authenticator = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userData.userData) {
      navigate("/feed");
    } else {
      navigate("/");
    }
  }, [userData]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // The promise returned by the dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error or, if available, payload created by rejectWithValue from a rejected action:
      const res = await login({ email, password }).unwrap();
      // toast.success("Login successfully!");
      dispatch(setCredentials(res));
    console.log('log')
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="authenticator-wrapper">
      <div className='login-container' id="login">
      <form onSubmit={submitHandler} class="space-y-6" action="/">
        <h5 className="sign-in-text">Sign In. We're glad you're here.</h5>
        <div>
          <label for="email" className="form-label">Email</label>
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            for="password"
            className="form-label">Password</label>
          <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="form-input"
            required
          />
        </div>
        {/* <button
          type="submit"
          class="">Already have an account? Sign 
        </button> */}
        {/* <p className="body-text">Already have an account? <span><Link to='/signin' className="general-link">Sign in now</Link></span>.</p> */}
       <p className='general-link' onClick={submitHandler}>Sign In</p>
        <div class=""><p className="body-text inline">Not registered? </p><span><Link to="/signup" class="general-link">Create account</Link></span>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Authenticator;
