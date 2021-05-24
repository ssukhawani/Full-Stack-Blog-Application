import React, { useEffect, useState } from "react";
import "./EditBlog.style.css";
import { useSelector, useDispatch } from "react-redux";
import NavbarOpen from "../../Components/NavbarOpen/NavbarOpen";
import NavbarClose from "../../Components/NavbarClose/NavbarClose";
import profile_pic from "../../Assets/profile_pic.svg";
import { withRouter } from "react-router";
import { getOneBlogEdit, DeleteBlog } from "../../Actions/blogActions";
import Loader from "../Loader/Loader";
// import ghost from "../../Assets/Ghost2.png";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { updateBlog } from "../../Actions/blogActions";
import parse from "html-react-parser";



const styleObj = {
  backgroundColor: "#FAF1F6",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
};

function EditBlog({ history, match }) {
  const initialState = useSelector((state) => state);
  const { id } = match.params;
  // console.log(id)

  const dispatch = useDispatch();
  const {
    authReducer: { userInfo },
    styleReducer: { toggleNavbar },
    blogReducer: { loading, singleBlog, logedInBlogs, allBlogs, oneBlog },
  } = initialState;

  
    const [image, setImage] = useState();
    const [image2, setImage2] = useState();
    const [flag, setFlag] = useState(false)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

  useEffect(() => {

    dispatch(getOneBlogEdit(userInfo, id, setTitle, setContent, setImage));
    // dispatch(getOneBlog(userInfo, Number(id)));
    // setTitle(singleBlog.title);
      setContent(oneBlog?.content);
      
    // var newBlob = new Blob([image], { type: "text/html" });
    // var reader = new FileReader();
    // reader.readAsDataURL(newBlob);
    // reader.onload = function (e) {
    //   setImage(e.target.result);
    //   setImage2(e.target.result);
    // };
  }, [dispatch, id, oneBlog?.content, userInfo]);

  const handelDelete=(id)=>{
    if (window.confirm("Do you really want to delete this Forever?")) {
    dispatch(DeleteBlog(userInfo, id, history));
    setTitle("")
    setContent("")
    }
  }

  const handelCreate =()=>{
    history.push('/create')
  }

  const logedInIndex = logedInBlogs.findIndex((item)=>item.id === singleBlog.id)
  const allblogIndex = allBlogs.findIndex((item) => item.id === singleBlog.id);



    const handelSave = () => {
      // console.log(image,title,content)
      const uploadData = new FormData();
      uploadData.append("title", title);
      uploadData.append("content", content);
      flag && uploadData.append("image", image2);
      uploadData.append(
        "blogIdentifier",
        title.split(" ").slice(0, 3).join("-")
      );
      uploadData.append("author", userInfo.user.id);

      dispatch(
        updateBlog(
          userInfo,
          uploadData,
          history,
          oneBlog?.id,
          logedInIndex,
          allblogIndex
        )
      );
    };

      const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(reader.result);
            setImage2(e.target.files[0]);
            setFlag(true)
          }
        };
        reader?.readAsDataURL(e.target.files[0]);
      };

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
            <div className="gridContainer4">
              <div className="blogsContainer4 scrollbar-hidden">
                <div
                  className="blogImage4"
                  style={{
                    backgroundImage: `url(${flag? image: oneBlog?.image})`,
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
                      <i class="fas fa-images"> Change Image</i>
                    </label>
                  </div>
                </div>
                <div className="blogTitle4">
                  <input
                    type="text"
                    value={title}
                    className="blogTitleInput"
                    placeholder="Add blog title here..."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="BlogDetails4">
                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={content}
                      id="editor"
                      onChange={(event, editor) => {
                        // const data2 = editor.setData(oneBlog?.content)
                        const data = editor.getData();
                        setContent(data);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="LogedInContainer4">
                <div className="userprofile4">
                  <img src={profile_pic} alt="profile"></img>
                  <span>{oneBlog?.author?.toUpperCase()}</span>
                  <span>Blog Author</span>
                </div>

                <div className="userblogs4" onClick={handelCreate}>
                  <div className="joinus2">
                    <div className="icons-join2">
                      <AddIcon style={styleObj} />
                    </div>
                    <span>Create New Blog</span>
                  </div>

                  <div
                    className="joinus2"
                    onClick={() => handelDelete(oneBlog?.id)}
                  >
                    <div className="icons-join2">
                      <DeleteForeverRoundedIcon style={styleObj} />
                    </div>
                    <span>Delete this Blog</span>
                  </div>

                  <div className="joinus2" onClick={handelSave}>
                    <div className="icons-join2">
                      <SaveIcon style={styleObj} />
                    </div>
                    <span>Save this Blog</span>
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

export default withRouter(EditBlog);
