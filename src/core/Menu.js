import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { signout, isAuthenticated } from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname === path)
        return { color: "#ff9900" }
    else return { color: "#000000" }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-pills justify-content-end">
            <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <li className="nav-item">
                    <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">Admin</Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === "subscriber" && (
                <>
                    <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, `/post/create`)} to={`/post/create`}>New Post</Link>
                    </li>
                </>
            )}
            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">SignIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                    </li>
                </>
            )}
            {isAuthenticated() && (
                <>
                    {isAuthenticated().user.role === "subscriber" && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, `/findpeople`)} to={`/findpeople`}>Find People</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, `/user/${isAuthenticated().user._id}`)} to={`/user/${isAuthenticated().user._id}`}>{isAuthenticated().user.name}</Link>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <span className="nav-link" style={(isActive(history, "/signout"), { cursor: "pointer", color: "#000000" })}
                            onClick={() => signout(() => history.push('/'))}>SignOut</span>
                    </li>
                </>
            )}
        </ul>
    </div >
)

export default withRouter(Menu);