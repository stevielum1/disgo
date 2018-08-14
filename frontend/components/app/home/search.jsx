import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      users: []
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const users = this.props.users.filter(user => (
      user.username.startsWith(e.currentTarget.value)
    ));
    this.setState({ input: e.currentTarget.value, users });
  }

  render() {
    if (this.props.loading) return null;

    return (
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleInput}
            placeholder="Find or start a conversation" />
        </div>
        <ul className="search-results">
          { this.state.users.map(user => (
              <li
                key={user.id}
                className="member-info">
                <img className="member-photo" src={user.photoUrl} />
                <p>{user.username}</p>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Search;
