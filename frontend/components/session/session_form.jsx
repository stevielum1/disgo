import React from 'react';
import { Link } from 'react-router-dom';
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
    this.props.processForm(this.state);
  }

  handleDemoLogin(e) {
    e.preventDefault();
    const demoUser = { email: "demo@disgo.com", password: "disgoPW" };
    this.props.processForm(demoUser);
  }

  findError(type) {
    return this.props.errors.filter(error => (
      error.toLowerCase().includes(type.toLowerCase())
    )).map(error => (
      <span
        key={error + Date.now()}
        className="session-error">{error}</span>
    ))
  }

  render() {
    const { formType, errors } = this.props;

    let formHeading = "";
    let formSubHeading = "";
    let loginErrors;

    if (formType === "Signup") {
      formHeading = "Create an account";
    } else {
      formHeading = "Welcome back!";
      formSubHeading = "We're so excited to see you again!";
      loginErrors = (
        <ul className="session-errors-list">
          {errors.map(error => (
            <li
              key={error + Date.now()}
              className="session-error">{error}</li>
          ))}
        </ul>
      );
    }

    const usernameError = this.findError('username');

    const usernameField = formType === "Signup" ? (
      <label>
        <p>Username</p>
        {usernameError}
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleInput('username')} />
      </label>
    ) : ( null );

    const emailError = this.findError('email');

    const emailField = (
      <label>
        <p>Email</p>
        {emailError}
        <input
          type="text"
          autoFocus="true"
          value={this.state.email}
          onChange={this.handleInput('email')} />
      </label>
    );

    const passwordError = this.findError('password')

    const passwordField = (
      <label>
        <p>Password</p>
        {passwordError}
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

            {loginErrors}
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

export default SessionForm;
