import React from 'react';
import ServerIndexItem from './server_index_item';
import CreateServerFormContainer from './create_server_form_container';
import Modal from '../modal/modal';

class ServerIndex extends React.Component {
  componentDidMount() {
    this.props.fetchServers();
  }

  render() {
    return (
      <div>
        <Modal />
        <ul>
          { this.props.servers.map(server => (
              <ServerIndexItem key={server.id} server={server} />
            ))
          }
          <li
          onClick={() => this.props.openModal('createServer')}>+</li>
        </ul>
        <div className="user-info-container">
          <i
            className="fas fa-cog"
            onClick={() => this.props.openModal('userInfo')}></i>
        </div>
      </div>
    )
  }
}

export default ServerIndex;
