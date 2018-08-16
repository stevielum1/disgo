import React from 'react';
import { withRouter } from 'react-router-dom';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentUser.id,
      username: this.props.currentUser.username,
      photoFile: null,
      photoUrl: this.props.currentUser.photoUrl
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    this.props.removeUserErrors();
  }

  handleInput(e) {
    this.setState({ username: e.currentTarget.value });
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
    formData.append('user[id]', this.state.id);
    formData.append('user[username]', this.state.username);
    if (this.state.photoFile) {
      formData.append('user[photo]', this.state.photoFile);
    }
    this.props.updateUser(formData)
      .then(() => this.props.closeModal());
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout()
      .then(() => this.props.closeModal())
      .then(() => this.props.history.push('/'));
  }

  render() {
    const { currentUser, errors } = this.props;
    const disabled = currentUser.username === "demo_disgo_user";
    return (
      <div className="user-info-form-container">
        <h1>{currentUser.username}'s info</h1>
        <ul className="user-error-list">
          { errors.map((error, idx) => (
            <li key={idx} className="user-error">
              {error}
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user-info-photo-upload">
            <img
            src={this.state.photoUrl}
            className="user-info-form-photo" />
          </label>
          <input
            id="user-info-photo-upload"
            type="file"
            onChange={this.handleFile}
            disabled={disabled} />
          <div className="edit-username-container">
            <label htmlFor="user-info-form-username">Edit username:</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleInput}
              disabled={disabled} />
            <button
              className="edit-user-info-button"
              onClick={this.handleSubmit}
              disabled={disabled}>Edit</button>
          </div>
        </form>
        <button type="submit" onClick={this.handleLogout}>Log Out</button>
      </div>
    )
  }
}

export default withRouter(UserInfo);
