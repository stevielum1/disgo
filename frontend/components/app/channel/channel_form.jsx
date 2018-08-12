import React from 'react';
import { withRouter } from 'react-router-dom';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state)
      .then(payload => {
        const channel = payload.channel;
        this.props.history.push(`/channels/${channel.serverId}/${channel.id}`);
      });
  }

  render() {
    const { formType, processForm } = this.props;

    const headingText = formType === "create" ? "Create channel" : "Edit channel";

    const buttonText = formType === "create" ? "Create" : "Edit";

    return (
      <div className="channel-form-container">
        <h2>{headingText}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInput}
            autoFocus="true" />
        </form>
        <button onSubmit={this.handleSubmit}>{buttonText}</button>
      </div>
    )
  }
}

export default withRouter(ChannelForm);
