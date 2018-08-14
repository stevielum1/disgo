import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({ input: e.currentTarget.value });
  }

  render() {
    if (this.props.loading) return null;

    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInput}
          placeholder="Find or start a conversation" />
      </div>
    )
  }
}

export default Search;
