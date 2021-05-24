import React from 'react'
import { useSelector } from 'react-redux'
import "./HomeScreen.style.css";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import LogedInDashboard from '../../Components/LogedInDashboard/LogedInDashboard'


function HomeScreen() {

  const styleReducer = useSelector(state=>state.styleReducer)
  const authReducer = useSelector((state) => state.authReducer);
  const { userInfo } = authReducer;

  const {toggleNavbar} = styleReducer

    return (
      <>
        {userInfo && JSON.stringify(userInfo) === "{}" ?
        (<div className={`${toggleNavbar ? "homescreenClose" : "homescreen"}`}>
          <div className={`${toggleNavbar ? "sideNavbarClose" : "sideNavbar"}`}>
            {toggleNavbar ? <NavbarClose /> : <NavbarOpen />}
          </div>
          <div
            className={`${
              toggleNavbar ? "blogDashboardClose" : "blogDashboardOpen"
            }`}
          >
            <div className="gridContainer">
              <div className="dashHeader"></div>
              <div className="dashTitle">
                <div>
                  <div className="greetings text-pop-up-top">Hello Dude !!</div>
                  <span className="greetDecs text-pop-up-top2">
                    Welcome to Techgenics <span>&#128525;</span>
                  </span>
                  <br />
                  <span className="greetDecs text-pop-up-top2">
                    We serve the Latest Tecnology, Business, Startup and Space
                    News..
                  </span>
                </div>
              </div>
              <div className="dashSidebar vibrate-1"></div>
              <div className="content1 vibrate-1">
                <div></div>
                {/* <span>category</span>
              <div> title</div> */}
              </div>
              <div className="content2 vibrate-1">
                <div></div>
              </div>
              <div className="content3 vibrate-1">
                <div></div>
              </div>
              <div className="content4 vibrate-1">
                <div></div>
              </div>
              <div className="dashFooter">
                <div></div>
              </div>
            </div>
          </div>
        </div>):(<LogedInDashboard/>)}
      </>
    );
}

export default HomeScreen
