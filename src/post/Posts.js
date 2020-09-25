import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DefaultImagePost from '../images/post-default.png';
import { list } from './apiPost'

class Posts extends Component {

    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    }

    renderPosts = (posts) => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.posted_by ? `/user/${post.posted_by._id}` : "";
                    const posterName = post.posted_by ? post.posted_by.name : " Unknown";
                    return (
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <img className="img-thumbnail mb-3" style={{ height: "200px", width: "auto" }} src={`${process.env.REACT_APP_API_URL}/post/picture/${post._id}`} onError={i => (i.target.src = DefaultImagePost)} alt={post.title} />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{(post.body).substring(0, 100)}{"..."}</p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by : <Link to={`${posterId}`}>{posterName}{" "}</Link>
                                    on : {new Date(post.created_at).toDateString()}
                                </p>
                                <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary btn-sm">Read more...</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{!posts.length ? "Loading..." : "Recent Posts"}</h2>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;