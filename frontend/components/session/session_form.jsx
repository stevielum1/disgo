import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      email: "",
      password: ""
    }
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    // Push "/" to browser history
  }

  render() {
    const { formType, errors } = this.props;

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
      <span>
        <Link to="/login">Already have an account?</Link>
      </span>
    ) : (
      <span>
        Need an account? <Link to="/signup">Register</Link>
      </span>
    );

    return (
      <div>
        <div className="session-logo">Disgo</div>
        <form
          className="session-form"
          onSubmit={this.handleSubmit}>

          <h2 className="session-header">{formType}</h2>

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
      </div>
    )
  }
}

export default SessionForm;
