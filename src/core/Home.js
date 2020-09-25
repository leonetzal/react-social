import React from 'react';

import DefaultImageProfile from '../images/user-default.jpg'
import { isAuthenticated } from '../auth'
import Posts from '../post/Posts';

const Home = () => (
    <div>
        <div className="jumbotron jumbotron-fluid">
            {isAuthenticated() && isAuthenticated().user && (
                <div className="d-inline-block ml-5" >
                    <img style={{ height: "200px", width: 'auto' }} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}/user/photo/${isAuthenticated().user._id}?${new Date().getTime()}`} onError={i => (i.target.src = DefaultImageProfile)} alt={isAuthenticated().user.name} />
                </div>
            )}
            <div className="d-inline-block">
                <div className="container-fluid">
                    <h1 className="display-4">Home</h1>
                    <p className="lead">Welcome to React FrontEnd</p>
                </div>
            </div>
        </div>
        <div className="container">
            <Posts />
        </div>
        <hr />
        <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="/"> My React and NodeJs Page</a>
            </div>
        </footer>
    </div >
)

export default Home;
