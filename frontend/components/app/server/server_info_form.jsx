import React from 'react';
import { withRouter } from 'react-router-dom';

class ServerInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.server;
    this.state.delete = false;
    this.handleInput = this.handleInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    this.props.updateServer(formData)
      .then(() => this.props.closeModal());
  }

  handleDelete(e) {
    if (this.state.delete === false) {
      this.setState({ delete: true });
    } else {
      this.props.deleteServer(this.props.server.id)
      .then(() => this.props.history.push("/"))
      .then(() => this.props.closeModal());
    }
  }

  render() {
    const { server, errors } = this.props;

    if (server === undefined) return <div>Loading...</div>;

    const deleteText = this.state.delete ? "ARE YOU SURE?" : "Delete Server";

    return (
      <div className="server-info-form-container">
        <h1>{server.name} info</h1>
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
            <label htmlFor="server-info-form-name">Edit server name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleInput} />
            <button
              className="edit-server-info-button"
              onClick={this.handleSubmit}>Edit</button>
          </div>
        </form>
        <button onClick={this.handleDelete}>{deleteText}</button>
      </div>
    )
  }
}

export default withRouter(ServerInfoForm);
