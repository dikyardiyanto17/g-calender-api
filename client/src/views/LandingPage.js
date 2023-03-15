import "../css/login.css";
import fb from "../asset/Fb.png";
import loginGambar from "../asset/Login.png";
import beam from "../asset/Beam.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { googleLogin, login } from "../stores/actions/actionCreator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    const { value, name } = e.target;
    const obj = { ...formLogin };
    obj[name] = value;
    setFormLogin(obj);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formLogin)).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 custom container1">
            <img src={beam} alt="G-cal" className="beam" />
            <div className="spantext" style={{ whiteSpace: "pre" }}>
              <p>Enjoy the Convenience of</p>
              <p>Beam Space Storage</p>
            </div>
            <img
              src="https://i.ibb.co/2jNwSgb/G-cal.png"
              alt="G-cal"
              className="left-bg"
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center flex-column whited">
            <h1 className="headline">Log in to Beam Space</h1>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                let decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);
                dispatch(googleLogin(decoded)).then((_) => navigate("/"));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <button className="customButton2">Log in with Facebook</button>
            <div className="headline2">
              <p>Or Login With Your Email</p>
            </div>
            <form onSubmit={submitHandler} style={{textAlign: 'center'}}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={changeHandler}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={changeHandler}
                  name="password"
                />
              </div>
              <button type="submit" className="customButton">
                Login
              </button>
            </form>
            <p className="forgot-password">Forgot Password?</p>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <p>Don’t have an account?</p>
              <p className="forgot-password2">Create an account</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
