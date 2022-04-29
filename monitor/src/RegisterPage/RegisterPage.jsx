import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import AuthService from "../_services/authentication.service";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const RegisterPage = () => {
  
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeInflux = (e) => {
    setIsChecked(!isChecked);
  }
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  
  return (
    <div className="col-md-12" style={{display: 'flex', background:'#ddd' ,justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <div className="card card-container" style={{alignItems:'center',textAlign:'center',background:'#17fc26',padding:"20px 20px" }}>
        <Form onSubmit={handleRegister} ref={form}>
        <div style={{alignItems:'center',textAlign:'center',background:'#17fc26' }}><h2 >Register</h2></div>
          {!successful && (
            <div>
              <div className="form-group" style={{alignItems:'center',textAlign:'center'}}>
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <br></br>
              <div className="form-group" style={{alignItems:'center',textAlign:'center'}}>
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <br></br>
              <div className="form-group" style={{alignItems:'center',textAlign:'center'}}>
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
              <br></br>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <Link to='/login'>Already registered? Go to login page</Link>
      </div>
    </div>
  );
};
export { RegisterPage };