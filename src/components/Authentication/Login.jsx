import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    async onSubmit(values) {
        const result = await axios.post("http://localhost:3456/users/login", JSON.stringify(values), {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        });
        console.log(result);
    }

    render() {
        return (
            <div className="column content is-half is-full-tablet is-full-mobile">
                <div className="form box">
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={{
                        }}
                        render={({ pristine, submitting, values }) => (
                            <>
                                <h2>Login</h2>
                                <div className="field">
                                    <div className="control is-expanded">
                                        <Field
                                            name="username"
                                            component="input"
                                            className="input is-size-6"
                                            placeholder="Username"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded">
                                        <Field
                                            name="password"
                                            type="password"
                                            component="input"
                                            className="input is-size-6"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <p className="control">
                                    <button className="button is-primary" onClick={() => this.onSubmit(values)}>
                                        <span className="icon">
                                            <i className="fas fa-sign-in-alt"></i>
                                        </span>
                                        <span>Login</span>
                                    </button>
                                </p>
                        <pre>{JSON.stringify(values, 4)}</pre>
                            </>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default Login;
