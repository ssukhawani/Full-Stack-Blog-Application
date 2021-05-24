import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Login.style.css";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import profile_pic from "../../Assets/profile_pic.svg";
import Error from "../../Components/Error/Error";
import { authorizeUser, refreshError } from "../../Actions/authActions";
import Loader from '../../Components/Loader/Loader'



function Login({history}) {
  const styleReducer = useSelector((state) => state.styleReducer);
  const authReducer = useSelector((state) => state.authReducer);

  const dispatch = useDispatch()

  const {loading, error} = authReducer
  const { toggleNavbar } = styleReducer;

  const [tempLogin, setTempLogin] = useState({})

  
  useEffect(() => {
    dispatch(refreshError());
  }, [dispatch]);

  const handelChange = (e) => {
    setTempLogin({...tempLogin, [e.target.name]:e.target.value})
  };

  const handelSubmit=(e)=>{
    e.preventDefault()
    dispatch(authorizeUser(tempLogin,history));
  }

  return (
    <div className={`${toggleNavbar ? "homescreenClose" : "homescreen"}`}>
      <div className={`${toggleNavbar ? "sideNavbarClose" : "sideNavbar"}`}>
        {toggleNavbar ? <NavbarClose /> : <NavbarOpen />}
      </div>
      <div
        className={`${toggleNavbar ? "blogDashboardClose" : "blogDashboard"}`}
      >
        {loading && <Loader/>}
        <div className="formContainer">
          <div className="signin-signup">
            <form className="login-form" onSubmit={handelSubmit}>
              <img src={profile_pic} alt="profile" />
              <h2>Login</h2>
              {<Error error={error}>{error}</Error>}
              <div className="input-div">
                <i className="fas fa-user i"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handelChange}
                  value={tempLogin.username}
                  required
                />
              </div>

              <div className="input-div">
                <i className="fas fa-envelope i"></i>
                <input
                  type="eamil"
                  name="email"
                  placeholder="Email"
                  onChange={handelChange}
                  value={tempLogin.email}
                  required
                />
              </div>

              <div className="input-div">
                <i className="fas fa-lock-open i"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handelChange}
                  value={tempLogin.password}
                  required
                />
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
