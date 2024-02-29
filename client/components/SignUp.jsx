 import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { useSignupMutation } from "../slices/api/userApiSlice";
import { setCredentials } from "../slices/reducers/authSlice";

const SignupPage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth);
  const [signup] = useSignupMutation();

  useEffect(() => {
    if(userData.userData) navigate('/');
  }, [userData, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // The promise returned by the dispatched thunk has an unwrap property which can be called to extract 
      // the payload of a fulfilled action or to throw either the error or, if available, payload created 
      // by rejectWithValue from a rejected action:
        const res = await signup({username, email, password }).unwrap();
        // toast.success("Sign up successfully!");
        dispatch(setCredentials(res));
    } catch (error) {
      //error?.data?.error: from server
      //error.data: from client
        // toast.error(error.data.error || error.data)
        console.log(error.data.error || error.data)
    }
  };

  return (
    <section id= "signup">
      <div className="">
        <div className="">
          <div className="login-container">
            <h1 className="sign-in-text">
              Sign Up
            </h1>

            <form onSubmit={submitHandler} className="">
              <div>
                <label
                  // for="email"
                  className="form-label"
                >Your name</label>
                <input
                  type="text"
                  value={username}
                  className="form-input"
                  placeholder="Code Smith"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  // for="email"
                  className="form-label"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  className="form-input"
                  placeholder="name@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  // for="password"
                  className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  className="form-input"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  
                  <div className="ml-3 text-sm">
                    
                  </div>
                </div>
              </div>

              <div className="sign-up-btn-container">
                <button type="submit" className="sign-up-btn">Sign up</button>
              </div>

              <p className="body-text">
                Have an Account?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;