import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavbarClose.style.css";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import AddIcon from "@material-ui/icons/Add";
import FaceIcon from "@material-ui/icons/Face";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { toggleNavbar } from "../../Actions/styleActions";
import { withRouter } from "react-router";
import { logout } from "../../Actions/authActions";


const styleObj = {
  backgroundColor: "#FAF1F6",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
};



function NavbarClose({history}) {

  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);

  const { userInfo } = authReducer;


  const handelProfile = () => {
      history.push("/profile");
    };

  const handelCreate = () => {
    history.push("/create");
  };

  const handelLogout = () => {
    dispatch(logout(history));
  };

  const handelHome =()=>{
    history.push('/')
  }

  const handelNavbar = () => {
      dispatch(toggleNavbar(false));
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

  return (
    <div className="absolute">
      <div className="siteTitle2">
        <div className="circledice2" onClick={handelNavbar}>
          <span></span>
        </div>
      </div>

      <div className="sideNavs2">
        {userInfo && JSON.stringify(userInfo) !== "{}" ? (
          <div className="gridNav2">
            <div className="icons2">
              <DashboardRoundedIcon style={styleObj} onClick={handelHome} />
            </div>
            <span className="tooltip2 dash">Dashboard</span>
          </div>
        ) : (
          <div className="gridNav2">
            <div className="icons2">
              <DashboardRoundedIcon
                style={styleObj}
                onClick={handelDashboard}
              />
            </div>
            <span className="tooltip2 dash">Dashboard</span>
          </div>
        )}

        {userInfo && JSON.stringify(userInfo) !== "{}" ? (
          <div className="gridNav2">
            <div className="icons2">
              <FaceIcon style={styleObj} onClick={handelProfile} />
            </div>
            <span className="tooltip2 log">Profile</span>
          </div>
        ) : (
          <div className="gridNav2">
            <div className="icons2">
              <HowToRegRoundedIcon style={styleObj} onClick={handelLogin} />
            </div>
            <span className="tooltip2 log">Login</span>
          </div>
        )}

        {userInfo && JSON.stringify(userInfo) !== "{}" ? (
          <div className="gridNav2">
            <div className="icons2">
              <ExitToAppIcon style={styleObj} onClick={handelLogout} />
            </div>
            <span className="tooltip2 sign">Logout</span>
          </div>
        ) : (
          <div className="gridNav2">
            <div className="icons2">
              <EditLocationRoundedIcon
                style={styleObj}
                onClick={handelRegister}
              />
            </div>
            <span className="tooltip2 sign">Signup</span>
          </div>
        )}

        {userInfo && JSON.stringify(userInfo) !== "{}" ? (
          <div className="gridNav2 last">
            <div className="icons2">
              <AddIcon style={styleObj} onClick={handelCreate} />
            </div>
            <span className="tooltip2 join">Create Blog</span>
          </div>
        ) : (
          <div className="gridNav2 last">
            <div className="icons2">
              <AddIcon style={styleObj} />
            </div>
            <span className="tooltip2 join">Joinus</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(NavbarClose);
