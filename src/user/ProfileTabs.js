import React, { Component } from 'react';

import DefaultImageProfile from '../images/user-default.jpg'
import DefaultImagePost from '../images/post-default.png';
import { Link } from 'react-router-dom';

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        return (
            <div className="container">
                <div className="row row-cols-3">
                    <div className="col-md-4">
                        <h3 className="text-primary text-center">Followers</h3>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}?${new Date().getTime()}`} onError={i => (i.target.src = DefaultImageProfile)} alt={person.name} />
                                        <div className="text-center">
                                            <p className="lead">{person.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary text-center">Following</h3>
                        <hr />
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}?${new Date().getTime()}`} onError={i => (i.target.src = DefaultImageProfile)} alt={person.name} />
                                        <div className="text-center">
                                            <p className="lead">{person.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary text-center">Posts</h3>
                        <hr />
                        {posts.map((post, i) => (
                            <div key={i}>
                                <Link to={`/post/${post._id}`}>
                                    <img className="img-thumbnail mb-3" style={{ objectFit: 'cover', objectPosition: 'center center' }} src={`${process.env.REACT_APP_API_URL}/post/picture/${post._id}?${new Date().getTime()}`} onError={i => (i.target.src = DefaultImagePost)} alt={post.title} />
                                    <div className="text-center">
                                        <p className="lead">{post.title}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTabs;