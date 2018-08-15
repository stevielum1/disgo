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
    this.props.updateLoading(true);
    this.props.processForm(this.state)
      .then(payload => {
        const channel = payload.channel;
        this.props.history.push(`/channels/${channel.serverId}/${channel.id}`);
      })
      .then(() => this.props.closeModal())
      .then(() => this.props.updateLoading(false));
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.updateLoading(true);
    this.props.deleteChannel(this.props.match.params.channelId)
      .then(() => this.props.closeModal())
      .then(() => this.props.history.push(`/channels/${this.props.match.params.serverId}/${this.props.firstChannel.id}`))
      .then(() => this.props.updateLoading(false));
  }

  render() {
    if (this.props.loading) return null;

    const { formType, processForm, errors } = this.props;

    let headingText, buttonText, deleteButton;

    if (formType === "create") {
      headingText = "Create channel";
      buttonText = "Create Channel";
      deleteButton = null;
    } else {
      headingText = "Edit channel";
      buttonText = "Edit Channel";
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

    return (
      <div className="channel-form-container">
        <h2>{headingText}</h2>
        { errors.map((error, idx) => (
          <p className="channel-error" key={idx}>
            {error}
          </p>
        ))}
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
