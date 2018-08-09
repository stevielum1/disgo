import React from 'react';

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <img
          src={this.props.currentUser.photoUrl}
          className="user-info-photo" />
        <button onClick={this.props.logout}>Log Out</button>
      </div>
    )
  }
}

export default UserInfo;
