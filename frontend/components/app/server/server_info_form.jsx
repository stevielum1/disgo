import React from 'react';
import { withRouter } from 'react-router-dom';

class ServerInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.server;
    this.state.delete = false;
    this.state.leave = false;
    this.state.owner = this.props.currentUser.id === this.props.server.ownerId;
    this.handleInput = this.handleInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWarning = this.handleWarning.bind(this);
  }

  componentDidMount() {
    this.props.removeServerErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onloadend = () => (
      this.setState({ photoUrl: reader.result, photoFile: file })
    );

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ photoUrl: this.props.currentUser.photoUrl, photoFile: null })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[id]', this.state.id);
    formData.append('server[name]', this.state.name);
    if (this.state.photoFile) {
      formData.append('server[photo]', this.state.photoFile);
    }
    this.props.updateLoading(true);
    this.props.updateServer(formData)
      .then(() => this.props.closeModal())
      .then(() => this.props.updateLoading(false));
  }

  handleWarning(e) {
    if (this.state.owner) {
      if (this.state.delete === false) {
        this.setState({ delete: true });
      } else {
        this.props.updateLoading(true);
        this.props.deleteServer(this.props.server.id)
          .then(() => this.props.closeModal())
          .then(() => this.props.history.push('/home'))
          .then(() => this.props.updateLoading(false));
      }
    } else {
      if (this.state.leave === false) {
        this.setState({ leave: true });
      } else {
        this.props.updateLoading(true);
        this.props.deleteMembership(this.props.membership.id)
          .then(() => this.props.closeModal())
          .then(() => this.props.history.push('/home'))
          .then(() => this.props.updateLoading(false));
      }
    }
  }

  render() {
    if (this.props.loading) return null;

    const { server, errors, currentUser } = this.props;
    const { owner } = this.state;

    let warningText, editSection;

    if (owner) {
      warningText = this.state.delete ? "ARE YOU SURE?" : "Delete Server";
      editSection = (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="server-info-photo-upload">
            <img
            src={this.state.photoUrl}
            className="server-info-form-photo" />
          </label>
          <input
            id="server-info-photo-upload"
            type="file"
            onChange={this.handleFile} />
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
      );
    } else {
      warningText = this.state.leave ? "ARE YOU SURE?" : "Leave Server";
    }

    return (
      <div className="server-info-form-container">
        <h1>{server.name}</h1>
        { errors.map((error, idx) => (
          <p key={idx} className="server-error">
            {error}
          </p>
        ))}
        {editSection}
        <button
          type="submit"
          onClick={this.handleWarning}>{warningText}</button>
      </div>
    )
  }
}

export default withRouter(ServerInfoForm);
