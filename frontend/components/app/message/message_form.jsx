import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      channel_id: this.props.channel.id
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ content: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createMessage(this.state)
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <div className="message-form-container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleInput}
            placeholder={`Message #${this.props.channel.name}`} />
        </form>
      </div>
    )
  }
}

export default MessageForm;
