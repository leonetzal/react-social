import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { signin, authenticate } from '../auth'

class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToRefer: false,
            loading: false,
            recaptcha: false
        }
    }

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        }
        if (this.state.recaptcha) {
            signin(user)
                .then(data => {
                    if (data.error) this.setState({ error: data.error, loading: false });
                    else {
                        authenticate(data, () => {
                            this.setState({ redirectToRefer: true })
                        });
                    }
                });
        } else {
            this.setState({
                loading: false,
                error: "What day is today? Please write a correct answer!"
            });
        }
    }

    signinForm = (email, password, recaptcha) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">
                    {recaptcha ? "Thanks. You got it!" : "What day is today?"}
                </label>
                <input onChange={this.recaptchaHandler} placeholder="Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday" type="text" className="form-control" />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
            <Link to="/forgot-password" className="btn btn-raised btn-info ml-2">Forgot Password</Link>
        </form>
    )

    render() {
        const { email, password, error, redirectToRefer, loading, recaptcha } = this.state;

        if (redirectToRefer)
            return <Redirect to="/" />

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}
                {this.signinForm(email, password, recaptcha)}
            </div>
        );
    }
}

export default SignIn;
