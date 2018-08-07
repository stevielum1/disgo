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
      <label>Username:
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleInput('username')} />
      </label>
    ) : ( null );

    const emailField = (
      <label>Email:
        <input
          type="text"
          value={this.state.email}
          onChange={this.handleInput('email')} />
      </label>
    );

    const passwordField = (
      <label>Password:
        <input
          type="password"
          value={this.state.password}
          onChange={this.handleInput('password')} />
      </label>
    );

    const otherButton = formType === "Signup" ? (
      <Link to="/login">Already have an account?</Link>
    ) : (
      <span>
        Need an account? <Link to="/signup">Register</Link>
      </span>
    );

    return (
      <div>
        <h2 className="session-header">{formType}</h2>
        {
          errors.map((error, idx) => (
            <p className="session-error" key={idx}>{error}</p>
          ))
        }
        <form
          className="session-form"
          onSubmit={this.handleSubmit}>
          {usernameField}
          {emailField}
          {passwordField}
          <button type="submit"
            onClick={this.handleSubmit}>{formType}</button>
        </form>
        {otherButton}
      </div>
    )
  }
}

export default SessionForm;
