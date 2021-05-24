import React, {useState} from "react";
import "./CreateBlog.style.css";
import { useSelector, useDispatch } from "react-redux";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import profile_pic from "../../Assets/profile_pic.svg";
import { withRouter } from "react-router";
import Loader from "../Loader/Loader";
import PublishIcon from "@material-ui/icons/Publish";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createBlog } from "../../Actions/blogActions";
// import parse from "html-react-parser";

const styleObj = {
  backgroundColor: "#FAF1F6",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
};

function CreateBlog({ history }) {
  const initialState = useSelector((state) => state);

  const dispatch = useDispatch()

  const {
    authReducer: { userInfo },
    styleReducer: { toggleNavbar },
    blogReducer: { loading},
  } = initialState;

  const [image, setImage] = useState()
  const [image2, setImage2] = useState();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handelPublish=()=>{
    // console.log(image,title,content)
    const uploadData = new FormData()
    uploadData.append("title", title)
    uploadData.append("content", content);
    uploadData.append("image", image2);
    uploadData.append("blogIdentifier", title.split(" ").slice(0, 3).join("-"));
    uploadData.append("author", userInfo.user.id);

    dispatch(createBlog(userInfo,uploadData,history));
  }

  const imageHandler=(e)=>{
    const reader = new FileReader()
    reader.onload=()=>{
      if(reader.readyState === 2){
        setImage(reader.result)
        setImage2(e.target.files[0])
      }
    }
    reader?.readAsDataURL(e.target.files[0])
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
        ) : (
          <>
            <div className="gridContainer5">
              <div className="blogsContainer5 scrollbar-hidden">
                <div
                  className="blogImage5"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                >
                  <input
                    type="file"
                    onChange={imageHandler}
                    name="image-upload"
                    id="input"
                  />
                  <div className="label">
                    <label htmlFor="input" className="image-uplod">
                      {image ? (
                        <i class="fas fa-images"> Change Image</i>
                      ) : (
                        <i class="fas fa-images"> Upload Blog Image</i>
                      )}
                    </label>
                  </div>
                </div>
                <div className="blogTitle5">
                  <input
                    type="text"
                    value={title}
                    className="blogTitleInput"
                    placeholder="Add blog title here..."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="BlogContent5">

                      <div className="editor">
                        <CKEditor 
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor)=>{
                          const data = editor.getData()
                          setContent(data);
                        }}
                        />
                      </div>


                </div>
              </div>

              <div className="LogedInContainer5">
                <div className="userprofile5">
                  <img src={profile_pic} alt="profile"></img>
                  <span>{userInfo.user.first_name}</span>
                  <span>Blog Author</span>
                </div>

                <div className="userblogs5">

                  <div className="joinus3" onClick={handelPublish}>
                    <div className="icons-join3">
                      <PublishIcon style={styleObj} />
                    </div>
                    <span>Publish</span>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(CreateBlog);
