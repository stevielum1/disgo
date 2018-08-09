import React from 'react';

class CreateServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.removeServerErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createServer(this.state);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="create-server-form-container">
        <form onSubmit={this.handleSubmit}>
          <h2>Create your server</h2>
          { errors.map((error, idx) => (
            <p className="server-error" key={idx}>
              {error}
            </p>
          ))}
          <p>
            By creating a server, you will have access to free  <del>voice and</del> text chat to use amongst your friends.
          </p>
          <label>
            <p>Server Name</p>
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.name}
              placeholder="Enter a server name"
              autoFocus="true" />
          </label>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

export default CreateServerForm;
