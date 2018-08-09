import React from 'react';

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        
        <button onClick={this.props.logout}>Log Out</button>
      </div>
    )
  }
}

export default UserInfo;
