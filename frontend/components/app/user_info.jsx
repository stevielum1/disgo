import React from 'react';

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <p>USER INFO</p>
        <button onClick={this.props.logout}>Log Out</button>
      </div>
    )
  }
}

export default UserInfo;
