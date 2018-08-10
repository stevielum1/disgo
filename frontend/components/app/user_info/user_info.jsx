import React from 'react';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentUser.id,
      username: this.props.currentUser.username,
      photoFile: null
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.removeUserErrors();
  }

  handleInput(e) {
    this.setState({ username: e.currentTarget.value });
  }

  handleFile(e) {
    e.preventDefault();
    this.setState({ photoFile: e.currentTarget.files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[id]', this.state.id);
    formData.append('user[username]', this.state.username);
    if (this.state.photoFile) {
      formData.append('user[photo]', this.state.photoFile);
    }
    this.props.updateUser
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout()
      .then(() => this.props.closeModal());
  }

  render() {
    const { currentUser, errors } = this.props;
    return (
      <div className="user-info-container">
        { errors.map((error, idx) => (
          <p key={idx} className="user-error">
            {error}
          </p>
        ))}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user-info-photo-upload">
            <img
            src={currentUser.photoUrl}
            className="user-info-photo" />
          </label>
          <input
            id="user-info-photo-upload"
            type="file" />
          <div className="edit-username-container">
            <label htmlFor="user-info-username">Edit username:</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleInput}
              disabled={currentUser.username === "demo_disgo_user" ? true : false} />
            <button
              className="edit-user-info-button"
              onClick={this.handleSubmit}>Edit</button>
          </div>
        </form>
        <button onClick={this.handleLogout}>Log Out</button>
      </div>
    )
  }
}

export default UserInfo;
