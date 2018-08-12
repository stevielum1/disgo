import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photoFile: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    this.props.removeServerErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[name]', this.state.name);
    if (this.state.photoFile) {
      formData.append('server[photo]', this.state.photoFile);
    }
    this.props.createServer(formData)
      .then(payload => {
        return this.props.createMembership(payload.server);
      })
      .then(payload => {
        const channel = {
          name: "general",
          server_id: payload.membership.serverId
        };
        return this.props.createChannel(channel);
      })
      .then(payload => this.props.history.push(`/channels/${payload.channel.serverId}/${payload.channel.id}`))
      .then(() => this.props.closeModal());
  }

  handleFile(e) {
    e.preventDefault()
    this.setState({ photoFile: e.currentTarget.files[0] });
  }

  render() {
    const { errors } = this.props;
    const photoFileName = this.state.photoFile ? `Uploaded ${this.state.photoFile.name}` : "";
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
          <div className="server-input-section">
            <label>
              <p>Server Name</p>
              <input
                type="text"
                onChange={this.handleInput}
                value={this.state.name}
                placeholder="Enter a server name"
                autoFocus="true" />
            </label>
            <label
              className="server-photo-input-label"
              htmlFor="server-photo-input">
              <div className="server-photo-input-placeholder">
                <p>Change</p>
                <p>Icon</p>
              </div>
            </label>
            <input
              type="file"
              id="server-photo-input"
              onChange={this.handleFile}
              accept="image/*" />
          </div>
          <div className="server-input-footer">
            <div className="server-photo-filename">{photoFileName}</div>
            <button>Create</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(CreateServerForm);
