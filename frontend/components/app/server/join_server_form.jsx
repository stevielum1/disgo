import React from 'react';

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
    this.props.createMembership(this.state)
      .then(payload => {
        this.props.fetchServers();
        return payload.membership;
      })
      .then(membership =>  {
        this.props.closeModal();
        return membership;
      })
      .then(membership => {
        debugger
        this.props.history.push(`/channels/${membership.serverId}`);
      });
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="join-server-form-container">
        <h2>Join a Server</h2>
        { errors.map((error, idx) => (
          <p className="membership-error" key={idx}>
            {error}
          </p>
        ))}
        <p>Enter the name of the server<br />you want to join below:</p>
        <form>
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

export default JoinServerForm;
