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
    if (state.channel == undefined) {
      return {
        messages: props.messages,
        channel: props.channel
      }
    };

    if (parseInt(props.match.params.channelId) !== state.channel.id) {
      return {
        messages: props.messages,
        channel: props.channel
      }
    } else {
      return state;
    }
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
        that.props.receiveMessage(data);
        let messages = that.state.messages;
        messages.push(data);
        that.setState({ messages });
      },
      create: function(message) {
        this.perform('create', {
          content: message.content,
          channelId: message.channelId,
          authorId: message.authorId
        });
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

    const { channel, createMessage, users, currentUserId } = this.props;
    const { messages } = this.state;

    return (
      <div className="message-index-container">
        <ul id="message-log">
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
          createMessage={createMessage}
          chats={this.chats}
          currentUserId={currentUserId} />
      </div>
    )
  }
}

export default MessageIndex;
