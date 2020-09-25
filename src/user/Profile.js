import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import DefaultImageProfile from '../images/user-default.jpg'
import { isAuthenticated } from '../auth'
import { read } from './apiUser'
import { listByUser } from '../post/apiPost';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignIn: false,
            following: false,
            error: '',
            posts: []
        }
    }

    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id;
        });
        return match;
    }

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({ user: data, following: !this.state.following });
                }
            });
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignIn: true });
            } else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following });
                this.loadPosts(data._id);
            }
        });
    }

    loadPosts = (userId) => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    // UNSAFE_componentWillReceiveProps(props) {
    //     const userId = props.match.params.userId;
    //     this.init(userId);
    // }

    render() {
        const { redirectToSignIn, user, posts } = this.state;
        if (redirectToSignIn)
            return <Redirect to="/signin" />

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                        <img style={{ height: "200px", width: 'auto' }} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`} onError={i => (i.target.src = DefaultImageProfile)} alt={user.name} />
                    </div>
                    <div className="col-md-4">
                        <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined: ${new Date(user.created_at).toDateString()}`}</p>
                            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                                <div className="d-inline-block">
                                    <Link className="btn btn-raised btn-info mr-2" to={`/post/create`}>Create Post</Link>
                                    <Link className="btn btn-raised btn-success mr-2" to={`/user/edit/${user._id}`}>Edit Profile</Link>
                                </div>
                            ) : (
                                    <FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton} />
                                )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        {isAuthenticated().user &&
                            isAuthenticated().user.role === "admin" && (
                                <div class="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Admin</h5>
                                        <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
                                        <hr />
                                        <hr />
                                        <div className="d-inline-block">
                                            <Link className="btn btn-raised btn-success mr-2" to={`/user/edit/${user._id}`}>Edit Profile</Link>
                                            <DeleteUser userId={user._id} />
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="row">
                        <div className="col md-12 mt-5 mb-5">
                            <hr />
                            <p className="lead">{user.about}</p>
                            <hr />
                            <ProfileTabs followers={user.followers} following={user.following} posts={posts} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
