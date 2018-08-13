import React from 'react';

class MessageIndexItem extends React.Component {
  render() {
    const { message, user } = this.props;
    return (
      <li>
        <p className="message-created-at">{message.createdAt}</p>
        <div className="message-body">
          <span>
            <span className="message-author">{user.username}</span>
            <span className="message-content">{message.content}</span>
          </span>
        </div>
      </li>
    )
  }
}

export default MessageIndexItem;
