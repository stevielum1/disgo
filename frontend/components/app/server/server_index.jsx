import React from 'react';
import ServerIndexItem from './server_index_item';
import CreateServerFormContainer from './create_server_form_container';
import ServerModal from './server_modal';

class ServerIndex extends React.Component {
  componentDidMount() {
    this.props.fetchServers();
  }

  render() {
    return (
      <div>
        <ServerModal />
        <ul>
          { this.props.servers.map(server => (
              <ServerIndexItem key={server.id} server={server} />
            ))
          }
          <li
          onClick={() => this.props.openModal('createServer')}>+</li>
        </ul>
      </div>
    )
  }
}

export default ServerIndex;
