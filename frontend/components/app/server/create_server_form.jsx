import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photoFile: null,
      photoUrl: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    this.props.removeServerErrors();
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[name]', this.state.name);
    if (this.state.photoFile) {
      formData.append('server[photo]', this.state.photoFile);
    }
    const that = this;
    // this.props.createServer(formData)
    //   .then(payload => {
    //     that.props.updateLoading(true);
    //     return that.props.createMembership(payload.server);
    //   })
    //   .then(payload => {
    //     const channel = {
    //       name: "general",
    //       server_id: payload.membership.serverId,
    //       destructible: false
    //     };
    //     return that.props.createChannel(channel);
    //   })
    //   .then(payload => that.props.history.push(`/channels/${payload.channel.serverId}/${payload.channel.id}`))
    //   .then(() => {
    //     that.props.closeModal();
    //     that.props.updateLoading(false);
    //   });
    this.props.createServer(formData)
      .then(payload => {
        that.props.updateLoading(true);
        that.props.createMembership(payload.server)
          .then(payload => {
            const channel = {
              name: "general",
              server_id: payload.membership.serverId,
              destructible: false
            };
            that.props.createChannel(channel)
              .then(payload => {
                that.props.history.push(`/channels/${payload.channel.serverId}/${payload.channel.id}`);
              })
              .then(() => {
                that.props.closeModal();
                that.props.updateLoading(false);
              });
          });
      });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onloadend = () => (
      this.setState({ photoUrl: reader.result, photoFile: file })
    );

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ photoUrl: this.props.currentUser.photoUrl, photoFile: null })
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="create-server-form-container">
        <form onSubmit={this.handleSubmit}>
          <h2>Create your server</h2>
          { errors.map((error, idx) => (
            <p className="server-error" key={idx}>
              {error}
            </p>
          ))}
          <p>
            By creating a server, you will have access to free  <del>voice and</del> text chat to use amongst your friends.
          </p>
          <div className="server-input-section">
            <label>
              <p>Server Name</p>
              <input
                type="text"
                onChange={this.handleInput}
                value={this.state.name}
                placeholder="Enter a server name"
                autoFocus="true" />
            </label>
            <label
              className="server-photo-input-label"
              htmlFor="server-photo-input">
              <img
                src={this.state.photoUrl}
                className="server-photo-input-placeholder" />
            </label>
            <input
              type="file"
              id="server-photo-input"
              onChange={this.handleFile}
              accept="image/*" />
          </div>
          <div className="server-input-footer">
            <button>Create</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(CreateServerForm);
