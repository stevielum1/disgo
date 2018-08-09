import React from 'react';

class CreateServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photoFile: null
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
    this.props.createServer(formData)
      .then(() => this.props.closeModal());
  }

  handleFile(e) {
    e.preventDefault()
    this.setState({ photoFile: e.currentTarget.files[0] });
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
          <label>
            <p>Server Name</p>
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.name}
              placeholder="Enter a server name"
              autoFocus="true" />
          </label>
          <input
            type="file"
            onChange={this.handleFile}
            accept="image/*" />
          <button>Create</button>
        </form>
      </div>
    )
  }
}

export default (CreateServerForm);
