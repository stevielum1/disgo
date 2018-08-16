import React from 'react';
import { withRouter } from 'react-router-dom';

class JoinServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.removeMembershipErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let membership = {
      name: this.state.name,
      userId: this.props.currentUser.id
    };
    this.props.createMembership(membership)
      .then(() => this.props.fetchServers())
      .then(() => this.props.closeModal());
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="join-server-form-container">
        <h2>Join a Server</h2>
        <ul className="membership-errors-list">
          { errors.map((error, idx) => (
            <li className="membership-error" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <p>Enter the name of the server<br />you want to join below:</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInput}
            autoFocus="true" />
        </form>
        <div className="join-server-form-button">
          <button onClick={this.handleSubmit}>Join</button>
        </div>
      </div>
    )
  }
}

export default withRouter(JoinServerForm);
