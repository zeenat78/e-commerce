import React, { useState } from "react";
import {
  signin,
  authenticate,
  isAuthenticated,
} from "../authentication/helper/Index";
import Base from "../core/Base";
import NavBar from "../core/NavBar";
import { Navigate} from "react-router-dom";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
    loading: false,
  });
  const { email, password, error, didRedirect, loading } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              didRedirect: true,
            });
          });
        }
      })

      .catch(console.log("signin request failed"));
  };
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block col-md-12 mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const loadingMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: loading ? "" : "none" }}
          >
            loading....
          </div>
        </div>
      </div>
    );
  };
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };
  return (
    <div>
      <NavBar />
      <Base title="SinIn Page" description="A page for user to signIn">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </Base>
    </div>
  );
};

export default SignIn;
