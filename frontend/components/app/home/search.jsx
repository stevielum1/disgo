import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      users: this.props.users,
      currentUser: this.props.currentUser
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const users = this.props.users.filter(user => (
      user.username.startsWith(e.currentTarget.value)
    ));
    this.setState({ input: e.currentTarget.value, users });
  }

  handleDM(otherUser) {
    //FIND EXISTING DM SERVER
    let currentUserMemberships = this.props.memberships.filter(membership => (
      membership.userId === this.props.currentUser.id
    ));

    let server;
    currentUserMemberships.forEach(membership => {
      //if server.name === "Direct Message_CID_OID"
      //or server.name === "Direct Message_OID_CID"
      //CID = currentUser.id, OID = otherUser.id
      if (this.props.servers[membership.serverId].name === `Direct Message_${this.props.currentUser.id}_${otherUser.id}` || this.props.servers[membership.serverId].name === `Direct Message_${otherUser.id}_${this.props.currentUser.id}`) {
        server = this.props.servers[membership.serverId];
      }
    });
    if (server) {
      const firstChannel = this.props.channels.filter(channel => (
        channel.serverId === server.id
      ))[0];
      this.props.history.push(`/home/${server.id}/${firstChannel.id}`);
    } else {
      //CREATE NEW DM SERVER
      const formData = new FormData();
      formData.append('server[name]', `Direct Message_${this.props.currentUser.id}_${otherUser.id}`);
      this.props.createServer(formData)
      .then(payload => {
        const membership1 = {
          serverId: payload.server.id,
          userId: this.props.currentUser.id
        };
        const membership2 = {
          serverId: payload.server.id,
          userId: otherUser.id
        };
        this.props.createMembership(membership1);
        return this.props.createMembership(membership2);
      })
      .then(payload => {
        const channel = {
          name: "Direct Message",
          server_id: payload.membership.serverId,
          destructible: false
        };
        this.props.createChannel(channel)
        .then(payload => {
          this.props.history.push(`/home/${payload.channel.serverId}/${payload.channel.id}`);
        });
      });
    }
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
                className="member-info"
                onClick={() => this.handleDM(user)}>
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
