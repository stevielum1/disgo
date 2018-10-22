import React from 'react';
import { withRouter } from 'react-router-dom';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.removeChannelErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state)
      .then(payload => {
        if (this.props.channelType === "text") {
          const channel = payload.channel;
          this.props.history.push(`/channels/${channel.serverId}/${channel.id}`);
        }
      })
      .then(() => this.props.closeModal());
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.updateLoading(true);
    this.props.deleteChannel(this.state.id)
      .then(() => this.props.closeModal())
      .then(() => this.props.history.push(`/channels/${this.props.match.params.serverId}/${this.props.firstChannel.id}`))
      .then(() => this.props.updateLoading(false));
  }

  findError(type) {
    return this.props.errors.filter(error => (
      error.toLowerCase().includes(type.toLowerCase())
    )).map(error => (
      <span
        key={error + Date.now()}
        className="channel-error">{error}</span>
    ))
  }

  render() {
    if (this.props.loading) return null;

    const { formType, channelType, processForm, errors } = this.props;

    let headingText, buttonText, deleteButton;

    if (formType === "create") {
      headingText = `Create ${channelType} channel`;
      buttonText = `Create ${channelType} channel`;
      deleteButton = null;
    } else {
      headingText = `Edit ${channelType} channel`;
      buttonText = `Edit ${channelType} channel`;
      deleteButton = (
        <div className="delete-channel">
        <button
          className="delete-channel-button"
          onClick={this.handleDelete}>Delete Channel</button>
        </div>
      );
    }

    if (!this.state.destructible) {
      deleteButton = null;
    }

    const nameError = this.findError("name");

    return (
      <div className="channel-form-container">
        <h2>{headingText}</h2>
        <ul className="channel-errors-list">
          {nameError}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInput}
            autoFocus="true" />
            <button onSubmit={this.handleSubmit}>{buttonText}</button>
        </form>
        {deleteButton}
      </div>
    )
  }
}

export default withRouter(ChannelForm);
