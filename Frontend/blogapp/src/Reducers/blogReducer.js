export const blogReducer = (
  state = {
    allBlogs: [],
    logedInBlogs: [],
    singleBlog: {},
    sucessMsg: "",
    oneBlog:{}
  },
  action
) => {
  switch (action.type) {
    case "ALL_BLOG_REQUEST":
      return { ...state, loading: true };

    case "ALL_BLOG_SUCESS":
      return { ...state, allBlogs: action.payload, loading: false };

    case "ALL_BLOG_FAILED":
      return { ...state, loading: false, error: action.payload };

    case "ONE_BLOG_R":
      return { ...state, loading: true };

    case "ONE_BLOG_S":
      return { ...state, oneBlog: action.payload, loading: false };

    case "ONE_BLOG_F":
      return { ...state, loading: false, error: action.payload };

    case "LOGED_BLOG_REQUEST":
      return { ...state, loading: true };

    case "LOGED_BLOG_SUCESS":
      return { ...state, logedInBlogs: action.payload, loading: false };

    case "LOGED_BLOG_FAILED":
      return { ...state, loading: false, error: action.payload };

    case "ONE_BLOG_REQUEST":
      return { ...state, loading: true };

    case "ONE_BLOG_SUCESS":
      return { ...state, singleBlog: action.payload, loading: false };

    case "ONE_BLOG_FAILED":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_BLOG_REQUEST":
      return { ...state, loading: true };

    case "DELETE_BLOG_SUCESS":
      return { ...state, sucessMsg: action.payload, loading: false };

    case "DELETE_BLOG_FAILED":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_BLOG_REQUEST":
      return { ...state, loading: true };

    case "CREATE_BLOG_SUCESS":
      return {
        ...state,
        logedInBlogs: [...state.logedInBlogs, action.payload],
        loading: false,
      };

    case "CREATE_BLOG_FAILED":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_BLOG_REQUEST":
      return { ...state, loading: true };

    case "UPDATE_BLOG_SUCESS":
      return {
        ...state,
        logedInBlogs: [
          ...state.logedInBlogs.slice(0, action.payload.logInInd),
          action.payload.data,
          ...state.logedInBlogs.slice(action.payload.logInInd + 1),
        ],
        allBlogs: [
          ...state.allBlogs.slice(0, action.payload.allInd),
          action.payload.data,
          ...state.allBlogs.slice(action.payload.allInd + 1),
        ],
        loading: false,
      };

    case "UPDATE_BLOG_FAILED":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return {
        allBlogs: [],
        logedInBlogs: [],
        singleBlog: {},
        sucessMsg: "",
        oneBlog:{}
      };

    default:
      return state;
  }
};
