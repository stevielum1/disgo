import React from 'react';

class ServerInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.server;
  }

  componentDidMount() {
    this.props.removeServerErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleFile(e) {
    e.preventDefault();
    this.setState({ photoFile: e.currentTarget.files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[id]', this.state.id);
    formData.append('server[name]', this.state.name);
    if (this.state.photoFile) {
      formData.append('server[photo]', this.state.photoFile);
    }
    debugger
    this.props.updateServer(formData)
      .then(() => this.props.closeModal());
  }

  render() {
    const { server, errors } = this.props;
    return (
      <div className="server-info-form-container">
        { errors.map((error, idx) => (
          <p key={idx} className="server-error">
            {error}
          </p>
        ))}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="server-info-photo-upload">
            <img
            src={server.photoUrl}
            className="server-info-form-photo" />
          </label>
          <input
            id="server-info-photo-upload"
            type="file" />
          <div className="edit-server-name-container">
            <label htmlFor="server-info-form-name">Edit username:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleInput} />
            <button
              className="edit-server-info-button"
              onClick={this.handleSubmit}>Edit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ServerInfoForm;
