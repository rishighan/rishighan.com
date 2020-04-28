import React, { Component } from "react";
import { Form, Field } from "react-final-form";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    onSubmit() {
        console.log("submitted");
    }

    render() {
        return (
            <div className="column content is-half is-full-tablet is-full-mobile">
                <div className="form box">
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={{
                            ...this.props.formData,
                        }}
                        render={({ pristine, submitting, values }) => (
                            <>
                                <h2>Login</h2>
                                <div className="field">
                                    <div className="control is-expanded">
                                        <Field
                                            name="usernameField"
                                            component="input"
                                            className="input is-size-6"
                                            placeholder="Username"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded">
                                        <Field
                                            name="passwordField"
                                            component="input"
                                            className="input is-size-6"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <p className="control">
                                    <button className="button is-primary">
                                        <span className="icon">
                                            <i className="fas fa-sign-in-alt"></i>
                                        </span>
                                        <span>Login</span>
                                    </button>
                                </p>
                            </>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default Login;
