import React from 'react';

class CreateServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createServer(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name
          <input
            type="text"
            onChange={this.handleInput}
            value={this.state.name} />
        </label>
        <button>Create Server</button>
      </form>
    )
  }
}

export default CreateServerForm;
