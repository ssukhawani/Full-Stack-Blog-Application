import React,{useState, useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import "./Signup.style.css";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import profile_pic from "../../Assets/profile_pic.svg";
import Error from '../../Components//Error/Error';
import { registerUser, refreshError } from "../../Actions/authActions";
import Loader from "../../Components/Loader/Loader";

function Signup({ history }) {
  const styleReducer = useSelector((state) => state.styleReducer);
  const authReducer = useSelector((state) => state.authReducer);

  const [tempRegister, setTempRegister] = useState({})
  const dispatch = useDispatch()

  const { loading, error } = authReducer;
  const { toggleNavbar } = styleReducer;


  useEffect(()=>{
    dispatch(refreshError())
  },[dispatch])

  const handelChange=(e)=>{
    setTempRegister({...tempRegister,[e.target.name]:e.target.value})
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(tempRegister,history));
  };

  return (
    <div className={`${toggleNavbar ? "homescreenClose" : "homescreen"}`}>
      <div className={`${toggleNavbar ? "sideNavbarClose" : "sideNavbar"}`}>
        {toggleNavbar ? <NavbarClose /> : <NavbarOpen />}
      </div>
      <div
        className={`${toggleNavbar ? "blogDashboardClose" : "blogDashboard"}`}
      >
        {loading && <Loader />}
        <div className="formContainer2">
          <div className="signin-signup2">
            <form className="hide"></form>
            <form
              className="signup-form2"
              autocomplete="off"
              onSubmit={handelSubmit}
            >
              <img src={profile_pic} alt="profile" />
              <h2>Sign up</h2>

              {<Error error={
                error?.username? error.username[0]:
                  error?.email? error.email[0]:
                    error?.password? error.password[0]: error
              }>{error?.username? error.username[0]:
                  error?.email? error.email[0]:
                    error?.password? "Short password dude !!": error}</Error>}

              <div className="input-div2">
                <i class="fas fa-signature"></i>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Name"
                  onChange={handelChange}
                  required
                />
              </div>

              <div className="input-div2">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handelChange}
                  required
                />
              </div>

              <div className="input-div2">
                <i className="fas fa-envelope"></i>
                <input
                  type="eamil"
                  name="email"
                  placeholder="Email"
                  onChange={handelChange}
                  required
                />
              </div>

              <div className="input-div2">
                <i className="fas fa-user-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handelChange}
                  required
                />
              </div>

              <button type="submit" className="btn2">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
