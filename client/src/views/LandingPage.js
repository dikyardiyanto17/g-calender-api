import "../css/login.css";
import googlebutton from "../asset/Google.png";
import fb from "../asset/Fb.png";
import login from "../asset/Login.png";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { googleLogin } from "../stores/actions/actionCreator";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-12 col-sm-6">
            <img
              src="https://i.ibb.co/2jNwSgb/G-cal.png"
              alt="G-cal"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-xxl-12 col-sm-6 d-flex justify-content-center align-items-center flex-column paddingTheDiv">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h1 className="headline">Log in to Beam Space</h1>
              <img src={googlebutton} alt="G-cal" style={{ width: "50%" }} />
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  let decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded);
                  dispatch(googleLogin(decoded)).then(_ => navigate('/'))
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              
              <img src={fb} alt="G-cal" style={{ width: "50%" }} />
              <div className="headline2">
                <p>Or Login With Your Email</p>
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="customButton">
                  <img src={login} alt="G-cal" style={{ width: "50%" }} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
