import axios from 'axios'
// import parse from "html-react-parser";

export const getAllBlogs = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "ALL_BLOG_REQUEST",
    });

    const config = {
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("api/getallblogs", config);

    dispatch({
      type: "ALL_BLOG_SUCESS",
      payload: data,
    });

    localStorage.setItem("allBlogs", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "ALL_BLOG_FAILED",
      payload: error.response ? error.response.data.detail : error.message,
    });
  }
};



export const getLogedInBlogs = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGED_BLOG_REQUEST",
    });

    const config = {
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("api/getlogedinblogs", config);

    dispatch({
      type: "LOGED_BLOG_SUCESS",
      payload: data,
    });

    localStorage.setItem("logedInBlogs", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "LOGED_BLOG_FAILED",
      payload: error.response ? error.response.data.detail : error.message,
    });
  }
};

export const getOneBlog =
  (userInfo, id) => async (dispatch) => {
    try {
      dispatch({
        type: "ONE_BLOG_REQUEST",
      });

      const config = {
        headers: {
          "Authorization": `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/getoneblog/${id}`,
        config
      );

      dispatch({
        type: "ONE_BLOG_SUCESS",
        payload: data,
      });



      localStorage.setItem("oneBlog", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "ONE_BLOG_FAILED",
        payload: error.response ? error.response.data.detail : error.message,
      });
    }
  };


export const DeleteBlog = (userInfo, id, history) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_BLOG_REQUEST",
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `http://127.0.0.1:8000/api/getoneblog/${id}`,
      config
    );

    dispatch({
      type: "DELETE_BLOG_SUCESS",
      payload: data.detail,
    });

    history.push("/")
    // localStorage.setItem("oneBlog", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "DELETE_BLOG_FAILED",
      payload: error.response ? error.response.data.detail : error.message,
    });
  }
};


export const updateBlog = (userInfo, uploadData, history, id, logInInd, allInd) => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_BLOG_REQUEST",
    });

    const config = {
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        // "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/getoneblog/${id}`,uploadData,
      config
    );

    dispatch({
      type: "UPDATE_BLOG_SUCESS",
      payload: { data, logInInd, allInd },
    });

    history.push("/");
    // localStorage.setItem("oneBlog", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "UPDATE_BLOG_FAILED",
      payload: error.response ? error.response.data.detail : error.message,
    });
  }
};



export const createBlog = (userInfo, uploadData, history) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_BLOG_REQUEST",
    });

    const config = {
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        // "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("api/createBlog",uploadData, config);

    dispatch({
      type: "CREATE_BLOG_SUCESS",
      payload: data,
    });

    history.push("/")
    // localStorage.setItem("logedInBlogs", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "CREATE_BLOG_FAILED",
      payload: error.response ? error.response.data.detail : error.message,
    });
  }
};

export const getOneBlogEdit =
  (userInfo, id, setTitle, setContent, setImage) => async (dispatch) => {
    try {
      dispatch({
        type: "ONE_BLOG_R",
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const data  = await axios.get(
        `http://127.0.0.1:8000/api/getoneblog/${id}`,
        config
      ).then(res=>res.data)

      dispatch({
        type: "ONE_BLOG_S",
        payload: data,
      });

      await setContent(data.content);
      await setTitle(data.title)

      
      localStorage.setItem("oneBlogEdit", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "ONE_BLOG_F",
        payload: error.response ? error.response.data.detail : error.message,
      });
    }
  };


