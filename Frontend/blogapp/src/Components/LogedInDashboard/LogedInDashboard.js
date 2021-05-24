import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LogedInDashboard.style.css";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import profile_pic from "../../Assets/profile_pic.svg";
import ghost from '../../Assets/Ghost2.png'
import { getAllBlogs, getLogedInBlogs } from "../../Actions/blogActions";
import { withRouter } from "react-router";
import Loader from '../Loader/Loader'




function LogedInDashboard({history}) {

  const initialState = useSelector((state) => state);

  const {
    authReducer: { userInfo },
    styleReducer: { toggleNavbar },
    blogReducer: { allBlogs, logedInBlogs, loading },
  } = initialState;

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogs(userInfo));
    dispatch(getLogedInBlogs(userInfo));
  }, [dispatch, userInfo])

  const handelBlogView=(id)=>{
    history.push(`/${id}`)
  }

  const handelCreate = () => {
    history.push("/create");
  };

  const handelEditView=(id)=>{
    history.push(`/edit/${id}`)
  }

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
        ) 
         : (
          <>
            <div className="gridContainer2">
              <div className="blogsContainer scrollbar-hidden">
                <div className="carousel"></div>
                <div className="search searchBox">
                  <input
                    type="text"
                    name=""
                    placeholder="Search"
                    className="searchInput"
                  />
                  <button className="searchButton">
                    <SearchSharpIcon />
                  </button>
                </div>
                <div className="Blogs">
                  {allBlogs &&
                    allBlogs.map((item, ind) => (
                      <div
                        className="blogCard"
                        key={ind}
                        onClick={() => handelBlogView(item.id)}
                      >
                        <img
                          src={`${item.image ? item.image : ghost}`}
                          alt="im"
                        ></img>
                        <div>
                          <span className="title">
                            {item.title.slice(0, 50)}
                          </span>
                          <br />
                          <div className="category-date">
                            <span>{item.category}</span>
                            <span>{item.post_date.slice(0, 10)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="LogedInContainer">
                <div className="userprofile">
                  <img src={profile_pic} alt="profile" className="profileImg"></img>
                  <span>{userInfo?.user.first_name}</span>
                  <span>Blogs by me</span>
                </div>

                <div className="userblogs">
                  {logedInBlogs.length !== 0 ? (
                    logedInBlogs.map((item, ind) => (
                      <div
                        className="userblogs-grid"
                        onClick={() => handelEditView(item?.id)}
                      >
                        <div
                          style={{ backgroundImage: `url(${item.image? item.image: ghost})` }}
                        ></div>
                        <div>
                          {item.title.slice(0, 50)}...
                          <span className="readmore">Edit</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="userblogs-grid" onClick={handelCreate}>
                      <div></div>
                      <div>
                        Create Your New Blog Here...
                        <span className="readmore">Create</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(LogedInDashboard);
