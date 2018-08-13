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

  componentWillReceiveProps(nextProps) {
    if (this.props.channel.id !== nextProps.channel.id) {
      this.state.channel_id = nextProps.channel.id;
    }
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
      <form
        className="message-form-container"
        onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.content}
          onChange={this.handleInput}
          placeholder={`Message #${this.props.channel.name}`} />
      </form>
    )
  }
}

export default MessageForm;