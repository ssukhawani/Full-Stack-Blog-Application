import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import './NavbarOpen.style.css'
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import AddIcon from "@material-ui/icons/Add";
import FaceIcon from "@material-ui/icons/Face";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import NavSvg from "../../Assets/Navbar.svg";
// import NavSvg3 from "../../Assets/Navbar3.svg";
import { toggleNavbar } from "../../Actions/styleActions";
import { withRouter } from "react-router";
import { logout } from '../../Actions/authActions'

const styleObj = {
  backgroundColor: "#FAF1F6",
  padding: "10px",
  borderRadius: "10px",
  boxShadow:"0 1px 3px rgba(0,0,0,0.2)"
};


function NavbarOpen({history}) {

  const dispatch = useDispatch()
  const authReducer = useSelector(state=>state.authReducer)

  const { userInfo } = authReducer

  const handelProfile =()=>{
    history.push('/profile')
  }

  const handelCreate = () => {
    history.push("/create");
  };

  const handelLogout=()=>{
    dispatch(logout(history));
  }

  const handelHome = () => {
    history.push("/");
  };

  const handelLogin = () => {
      history.push("/login");
    };

  const handelRegister = () => {
    history.push("/register");
  };

  const handelDashboard = () => {
    history.push("/");
  };

  const handelNavbar=()=>{
    dispatch(toggleNavbar(true));
  }
    return (
      <div>
        <div className="siteTitle">
          <h2>Techgenics</h2>
          <div className="circledice" onClick={handelNavbar}>
            <span></span>
          </div>
        </div>

        <div className="sideNavs">
          {userInfo && JSON.stringify(userInfo) !== "{}" ? (
            <div className="gridNav" onClick={handelHome}>
              <div className="icons">
                <DashboardRoundedIcon style={styleObj} />
              </div>
              <span>Dashboard</span>
            </div>
          ) : (
            <div className="gridNav" onClick={handelDashboard}>
              <div className="icons">
                <DashboardRoundedIcon style={styleObj} />
              </div>
              <span>Dashboard</span>
            </div>
          )}

          {userInfo && JSON.stringify(userInfo) !== "{}" ? (
            <div className="gridNav" onClick={handelProfile}>
              <div className="icons">
                <FaceIcon style={styleObj} />
              </div>
              <span>Profile</span>
            </div>
          ) : (
            <div className="gridNav" onClick={handelLogin}>
              <div className="icons">
                <HowToRegRoundedIcon style={styleObj} />
              </div>
              <span>Login</span>
            </div>
          )}

          {userInfo && JSON.stringify(userInfo) !== "{}" ? (
            <div className="gridNav" onClick={handelLogout}>
              <div className="icons">
                <ExitToAppIcon style={styleObj} />
              </div>
              <span>Logout</span>
            </div>
          ) : (
            <div className="gridNav" onClick={handelRegister}>
              <div className="icons">
                <EditLocationRoundedIcon style={styleObj} />
              </div>
              <span>Signup</span>
            </div>
          )}
        </div>

        {userInfo && JSON.stringify(userInfo) !== "{}" ? (
          <div className="joinusContainer" onClick={handelCreate}>
            <div className="joinus">
              <div className="icons-join">
                <AddIcon style={styleObj} />
              </div>
              <span>Create Blog</span>
            </div>
          </div>
        ) : (
          <div className="joinusContainer">
            <div className="joinus">
              <div className="icons-join">
                <AddIcon style={styleObj} />
              </div>
              <span>Join us</span>
            </div>
          </div>
        )}
        {/* 
        <div className="NavSvg">
          <img src={NavSvg3} style={NavSvgStyle2} alt="NavSvg" />
          <img src={NavSvg} style={NavSvgStyle} alt="NavSvg" />
        </div> */}
      </div>
    );
}

export default withRouter(NavbarOpen);
