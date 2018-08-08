import React from 'react';

class ServerIndex extends React.Component {
  componentDidMount() {
    this.props.fetchServers();
  }
  render() {
    return (
      <div>
        { this.props.servers.map(server => (
            <ServerIndexItem key={server.id} server={server} />
          ))
        }
      </div>
    )
  }
}

export default ServerIndex;
