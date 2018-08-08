import React from 'react';
import ServerIndexItem from './server_index_item';
import CreateServerFormContainer from './create_server_form_container';

class ServerIndex extends React.Component {
  componentDidMount() {
    this.props.fetchServers();
  }

  render() {
    return (
      <div>
        <ul>
          { this.props.servers.map(server => (
              <ServerIndexItem key={server.id} server={server} />
            ))
          }
        </ul>
        <CreateServerFormContainer />
      </div>
    )
  }
}

export default ServerIndex;
