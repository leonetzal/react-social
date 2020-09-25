import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './core/Home';
import Menu from './core/Menu';

import Admin from './admin/Admin'

import SignUp from './user/SignUp'
import SignIn from './user/SignIn'

import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'
import ResetPassword from "./user/ResetPassword";
import ForgotPassword from "./user/ForgotPassword";

import Post from './post/Post';
import NewPost from './post/NewPost';
import EditPost from './post/EditPost';

import PrivateRoute from './auth/PrivateRoute';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />

            <PrivateRoute exact path="/admin" component={Admin} />

            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />

            <PrivateRoute exact path="/post/create" component={NewPost} />
            <Route exact path="/post/:postId" component={Post} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />

            <Route exact path="/users" component={Users} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />


        </Switch>
    </div>
);

export default MainRouter;
