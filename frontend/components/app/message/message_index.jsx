import React from 'react';
import MessageForm from './message_form';
import MessageIndexItem from './message_index_item';

class MessageIndex extends React.Component {
  render() {
    if (this.props.channel === undefined) return <div>Loading...</div>;

    const { messages, channel, createMessage, users } = this.props;

    return (
      <div className="message-index-container">
        <ul>
          { messages.map(message => (
              <MessageIndexItem
                key={message.id}
                message={message}
                user={users[message.authorId]} />
            ))
          }
        </ul>
        <MessageForm
          channel={channel}
          createMessage={createMessage} />
      </div>
    )
  }
}

export default MessageIndex;
