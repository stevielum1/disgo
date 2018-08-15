import React from 'react';
import MessageForm from './message_form';
import MessageIndexItem from './message_index_item';

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
      channel: this.props.channel
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.props.fetchServers();
      if (this.chats) {
        this.chats.unsubscribe();
      }
      this.createSocket();
    }
    this.scrollToBottom();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      messages: props.messages,
      channel: props.channel
    };
  }

  createSocket() {
    let that = this;

    let cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel',
      channel_id: that.props.match.params.channelId
    }, {
      connected: () => {},
      received: data => {
        if (data.type === "destroy") {
          that.props.removeMessage(data.message.id);
        } else {
          that.props.receiveMessage(data.message);
        }
      },
      create: function(message) {
        this.perform('create', {
          content: message.content,
          channelId: message.channelId,
          authorId: message.authorId
        });
      },
      update: function(message) {
        this.perform('update', {
          id: message.id,
          content: message.content,
          channelId: message.channelId,
          authorId: message.authorId
        })
      },
      delete: function(message) {
        this.perform('destroy', {
          id: message.id
        })
      }
    });
  }

  scrollToBottom() {
    const messages = document.getElementById('message-log');
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  render() {
    if (this.props.loading) return null;

    const { channel, users, currentUserId } = this.props;

    const { messages } = this.state;

    return (
      <div className="app-message-column">
        <div className="message-index-container">
          <ul id="message-log">
            { messages.map(message => (
                <MessageIndexItem
                  key={message.id + Date.now()}
                  message={message}
                  user={users[message.authorId]}
                  currentUserId={currentUserId}
                  chats={this.chats} />
              ))
            }
          </ul>
          <MessageForm
            channel={channel}
            chats={this.chats}
            currentUserId={currentUserId} />
        </div>
      </div>
    )
  }
}

export default MessageIndex;
