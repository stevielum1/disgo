import React from 'react';

class MessageIndexItem extends React.Component {
  render() {
    const { message, user } = this.props;
    return (
      <li>
        <p className="message-created-at">{message.createdAt}</p>
        <p className="message-author">{user.username}</p>
        <p className="message-content">{message.content}</p>
      </li>
    )
  }
}

export default MessageIndexItem;
