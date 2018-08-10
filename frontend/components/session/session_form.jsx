import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  componentDidMount() {
    this.props.clearSessionErrors();
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state)
      .then(this.props.history.push('/home'));
  }

  handleDemoLogin(e) {
    e.preventDefault();
    const demoUser = { email: "demo@disgo.com", password: "disgoPW" };
    this.props.processForm(demoUser)
      .then(() => this.props.history.push('/home'));
  }

  render() {
    const { formType, errors } = this.props;

    let formHeading = "";
    let formSubHeading = "";

    if (formType === "Signup") {
      formHeading = "Create an account";
    } else {
      formHeading = "Welcome back!";
      formSubHeading = "We're so excited to see you again!";
    }

    const usernameField = formType === "Signup" ? (
      <label>
        <p>Username</p>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleInput('username')} />
      </label>
    ) : ( null );

    const emailField = (
      <label>
        <p>Email</p>
        <input
          type="text"
          autoFocus="true"
          value={this.state.email}
          onChange={this.handleInput('email')} />
      </label>
    );

    const passwordField = (
      <label>
        <p>Password</p>
        <input
          type="password"
          value={this.state.password}
          onChange={this.handleInput('password')} />
      </label>
    );

    const otherButton = formType === "Signup" ? (
      <div className="session-other-button">
        <span>
          <Link to="/login">Already have an account?</Link>
        </span>
      </div>
    ) : (
      <div className="session-other-button">
        <div>
          <span>Need an account?</span>
          <Link to="/signup">Register</Link>
        </div>
          <Link to="#" onClick={this.handleDemoLogin}>Try the demo!</Link>
      </div>
    );

    return (
      <div className="session-form-container">
        <div className="session-logo">DISGO</div>
        <ReactCSSTransitionGroup
        transitionName="session-form"
        transitionAppear={true}
        transitionAppearTimeout={250}
        transitionEnter={false}
        transitionLeave={false}>
          <form
            className="session-form"
            onSubmit={this.handleSubmit}>

            <h2 className="session-header">{formHeading}</h2>
            <h3>{formSubHeading}</h3>

            {
              errors.map((error, idx) => (
                <p className="session-error" key={idx}>{error}</p>
              ))
            }

            {emailField}
            {usernameField}
            {passwordField}

            <button
              type="submit"
              onClick={this.handleSubmit}>{formType}</button>

            {otherButton}
          </form>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default withRouter(SessionForm);
