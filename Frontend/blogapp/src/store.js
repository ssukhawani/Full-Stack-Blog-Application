import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {styleReducer} from './Reducers/styleReducer'
import {authReducer} from './Reducers/authReducer'
import { blogReducer } from "./Reducers/blogReducer";



const reducer = combineReducers({
  styleReducer,
  authReducer,
  blogReducer
});

  const userInfoFromLocal = localStorage.getItem("userWithToken")
    ? JSON.parse(localStorage.getItem("userWithToken"))
    : {};

  const allBlogsFromLocal = (localStorage.getItem("allBlogs"))
    ? JSON.parse(localStorage.getItem("allBlogs"))
    : [];

  const logedInBlogsFromLocal = localStorage.getItem("logedInBlogs")
    ? JSON.parse(localStorage.getItem("logedInBlogs"))
    : [];
  
  const oneBlogFromLocal = localStorage.getItem("oneBlog")
    ? JSON.parse(localStorage.getItem("oneBlog"))
    : {};

const initialState = {
  authReducer: { userInfo: userInfoFromLocal },
  blogReducer: {
    allBlogs: allBlogsFromLocal,
    logedInBlogs: logedInBlogsFromLocal,
    singleBlog: oneBlogFromLocal,
  },
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store


