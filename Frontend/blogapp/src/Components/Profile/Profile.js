import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.style.css";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import profile_pic from "../../Assets/profile_pic.svg";
import { withRouter } from "react-router";
import ghost from "../../Assets/Ghost2.png";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { DeleteBlog } from "../../Actions/blogActions";



const styleObj = {
  backgroundColor: "#FAF1F6",
  padding: "10px",
  margin:"2px",
  borderRadius: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
};

function Profile({history}) {
    const initialState = useSelector((state) => state);

    const {
      authReducer: { userInfo },
      styleReducer: { toggleNavbar },
      blogReducer: { allBlogs, logedInBlogs, loading },
    } = initialState;

    const dispatch = useDispatch();
  
  const handelCreate = () => {
    history.push("/create");
  };

    const handelDelete = (id) => {
      if (window.confirm("Do you really want to delete this Forever?")) {
        dispatch(DeleteBlog(userInfo, id, history));
      }
    };

const handelBlogView = (id) => {
  history.push(`/${id}`);
};

  const handelEditView = (id) => {
    history.push(`/edit/${id}`);
  };

  return (
    <div className={`${toggleNavbar ? "homescreenClose" : "homescreen"}`}>
      <div className={`${toggleNavbar ? "sideNavbarClose" : "sideNavbar"}`}>
        {toggleNavbar ? <NavbarClose /> : <NavbarOpen />}
      </div>
      <div
        className={`${
          toggleNavbar ? "blogDashboardClose" : "blogDashboardOpen"
        }`}
      >
        <div className="profileContainer">
          <div className="LogedInContainer2">
            <div className="uprofile">
              <img
                src={profile_pic}
                alt="profile"
                className="profileImg2"
              ></img>
              <div>
                <div className="input-div-profile">
                  <i className="fas fa-user i"></i>
                  <input
                    type="text"
                    placeholder="name"
                    value={userInfo?.user.first_name}
                  ></input>
                </div>
                <div className="input-div-profile">
                  <i className="fas fa-envelope i"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={userInfo?.user.email}
                  ></input>
                </div>
              </div>
            </div>

            <div className="userblogs5">
              {logedInBlogs.length !== 0 ? (
                logedInBlogs.map((item, ind) => (
                  <div className="userblogs5-grid">
                    <div
                      style={{
                        backgroundImage: `url(${
                          item.image ? item.image : ghost
                        })`,
                      }}
                    ></div>
                    <div>
                      {item.title.slice(0, 50)}...
                      <span
                        className="readmore2"
                        onClick={() => handelBlogView(item?.id)}
                      >
                        Read more
                      </span>
                    </div>
                    <div className="delete-Edit">
                      <DeleteForeverRoundedIcon
                        style={styleObj}
                        onClick={() => handelDelete(item?.id)}
                      />
                      <EditTwoToneIcon
                        style={styleObj}
                        onClick={() => handelEditView(item?.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="userblogs5-grid" onClick={handelCreate}>
                  <div></div>
                  <div>
                    Create Your New Blog Here...
                    <span className="readmore2">Create</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Profile);

