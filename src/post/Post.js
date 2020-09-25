import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../auth'
import DefaultImagePost from '../images/post-default.png';
import { getPost, remove, like, unlike } from './apiPost'
import Comment from './Comment';

class Post extends Component {
    state = {
        post: '',
        redirectToHome: false,
        like: false,
        likes: 0,
        redirectToSignIn: false,
        comments: []
    }

    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        getPost(postId)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({
                        post: data,
                        likes: data.likes.length,
                        like: this.checkLike(data.likes),
                        comments: data.comments
                    });
                }
            });
    }

    updateComments = comments => {
        this.setState({ comments });
    }

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({ redirectToSignIn: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.state.post._id;
        callApi(userId, token, postId).then(data => {
            if (data.error) console.log(data.error);
            else {
                this.setState({ like: !this.state.like, likes: data.likes.length });
            }
        });
    }

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your post?");
        if (answer)
            this.deletePost()
    }

    renderPost = (post) => {
        const posterId = post.posted_by ? `/user/${post.posted_by._id}` : "";
        const posterName = post.posted_by ? post.posted_by.name : " Unknown";
        const { like, likes } = this.state;
        return (
            <div className="card-body">
                <img className="img-thumbnail mb-3" style={{ height: "300px", width: '100%', objectFit: 'cover' }} src={`${process.env.REACT_APP_API_URL}/post/picture/${post._id}`} onError={i => (i.target.src = DefaultImagePost)} alt={post.title} />
                <div className="row">
                    <div className="col-md-2">
                        {like ? (
                            <button className="btn btn-warning btn-lg" onClick={this.likeToggle}>Unlike</button>
                        ) : (
                                <button className="btn btn-primary btn-lg" onClick={this.likeToggle}>Like</button>
                            )}
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                        {isAuthenticated().user &&
                            isAuthenticated().user.role === "admin" && (
                                <div>
                                    <Link className="btn btn-raised btn-success mr-2" to={`/post/edit/${post._id}`}>Update Post</Link>
                                    <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">Delete Post</button>
                                </div>
                            )}
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2">
                        <h4 style={{ textAlign: 'right' }}>
                            {likes !== 0 ? (
                                <i className="fa fa-thumbs-up text-success bg-dark" style={{ textAlign: 'right', padding: '10px', borderRadius: '50%' }} />
                            ) : (
                                    <i className="fa fa-thumbs-up text-warning bg-dark" style={{ textAlign: 'right', padding: '10px', borderRadius: '50%' }} />
                                )}
                            {" "}{likes}: likes
                        </h4>
                    </div>
                </div>
                <p className="card-text" style={{ textAlign: 'justify' }}>{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted by : <Link to={`${posterId}`}>{posterName}{" "}</Link>
                        on : {new Date(post.created_at).toDateString()}
                </p>
                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">Back to posts</Link>
                    {isAuthenticated().user && isAuthenticated().user._id === post.posted_by._id && (
                        <>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-info btn-sm mr-5">Update Post</Link>
                            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger btn-sm">Delete Post</button>
                        </>)
                    }
                </div>
            </div>
        );
    }

    render() {
        const { post, redirectToHome, redirectToSignIn, comments } = this.state;
        if (redirectToHome)
            return <Redirect to={`/`} />;
        else if (redirectToSignIn)
            return <Redirect to={`/signin`} />;

        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5 text-center">{post.title}</h2>
                {!post ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : this.renderPost(post)}
                <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments} />
            </div>
        );
    }
}

export default Post;