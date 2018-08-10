import React from 'react';

class JoinServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.removeMembershipErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  render() {
    return (
      <div className="join-server-form-container">
        <h2>Join a Server</h2>
        <p>Enter the name of the server<br />you want to join below:</p>
        <form>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInput}
            autoFocus="true" />
        </form>
        <div className="join-server-form-button">
          <button>Join</button>
        </div>
      </div>
    )
  }
}

export default JoinServerForm;
