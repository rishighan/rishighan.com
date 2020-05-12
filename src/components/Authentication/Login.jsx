import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { userAPICall } from "../../actions/user.actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      redirectToReferrer: false,
    };
  }

  async onSubmit(values) {}
  componentDidMount() {
    this.props.getLoggedInUser();
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
                    onClick={() => this.props.loginUser({ user: values })}
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
  return {
    user: state.user.loggedInUser,
  };
}
const mapDispatchToProps = (dispatch) => ({
  loginUser: async (values) => {
    dispatch(
      userAPICall({
        callURIAction: "login",
        callMethod: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: JSON.stringify(values),
      })
    );
  },
  getLoggedInUser: () => {
    const token = localStorage.token;
    if (token) {
      dispatch(
        userAPICall({
          callURIAction: "me",
          callMethod: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
