import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import Login from './Screens/Login/Login'
import Signup from "./Screens/Signup/Signup";
import ViewBlog from "./Components/ViewBlog/ViewBlog";
import EditBlog from "./Components/EditBlog/EditBlog"; 
import CreateBlog from './Components/CreateBlog/CreateBlog';
import Profile from "./Components/Profile/Profile";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Signup} />
          <Route path="/create" component={CreateBlog} />
          <Route path="/edit/:id" component={EditBlog} />
          <Route path="/:id" component={ViewBlog} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
