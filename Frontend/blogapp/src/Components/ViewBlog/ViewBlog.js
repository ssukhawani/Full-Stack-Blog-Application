import React, { useEffect } from "react";
import "./ViewBlog.style.css";
import { useSelector, useDispatch} from "react-redux";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import profile_pic from "../../Assets/profile_pic.svg";
import { withRouter } from "react-router";
import { getOneBlog } from "../../Actions/blogActions";
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import ghost from '../../Assets/Ghost2.png'



function ViewBlog({ history, match }) {
  const initialState = useSelector((state) => state);
  const { id } = match.params

  const dispatch = useDispatch()
  const {
    authReducer: { userInfo },
    styleReducer: { toggleNavbar },
    blogReducer: { error, loading, singleBlog },
  } = initialState;


  useEffect(() => {

    dispatch(getOneBlog(userInfo, Number(id)));

  }, [dispatch, id, userInfo]);


  return (
    <div className={`${toggleNavbar ? "homescreenClose2" : "homescreen2"}`}>
      <div className={`${toggleNavbar ? "sideNavbarClose2" : "sideNavbar2"}`}>
        {toggleNavbar ? <NavbarClose /> : <NavbarOpen />}
      </div>
      <div
        className={`${toggleNavbar ? "blogDashboardClose2" : "blogDashboard2"}`}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Error error={error}>{error}</Error>
        ) : (
          <>
            <div className="gridContainer3">
              <div className="blogsContainer3 scrollbar-hidden">
                <div
                  className="blogImage"
                  style={{ backgroundImage: `url(${singleBlog?.image ? singleBlog?.image:ghost})` }}
                ></div>
                <div
                  className="blogTitle"
                  dangerouslySetInnerHTML={{
                    __html: "<h3>" + singleBlog?.title + "</h3>",
                  }}
                ></div>
                <div
                  className="BlogDetails"
                  dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
                ></div>
              </div>

              <div className="LogedInContainer3">
                <div className="userprofile3">
                  <img src={profile_pic} alt="profile"></img>
                  <span>{singleBlog?.author?.toUpperCase()}</span>
                  <span>Blog Author</span>
                </div>

                <div className="userblogs3"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(ViewBlog);

