import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signInAction } from "../../actions/user.actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  async onSubmit(values) {}
  /**
   * Matches a string with the provided regex.
   * @param {string} sourceText - The string to match.
   * @param {RegExp} pattern - A regular expression.
   */
  login(values) {
    this.props.signInAction(values, this.props.history);
  }

  render() {
    return (
      <div className="column content is-half is-full-tablet is-full-mobile">
        <div className="form box">
          <Form
            onSubmit={this.onSubmit}
            initialValues={{}}
            render={({ pristine, submitting, values }) => (
              <>
                <h2>Login</h2>
                <div className="field">
                  <div className="control is-expanded">
                    <Field
                      name="email"
                      component="input"
                      className="input is-size-6"
                      placeholder="E-mail"
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
                  <button
                    className="button is-primary"
                    onClick={() => this.login({ user: values })}
                  >
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

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}

export default withRouter(connect(mapStateToProps, { signInAction })(Login));
