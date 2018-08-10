import React from 'react';
import ServerIndexItem from './server_index_item';
import CreateServerFormContainer from './create_server_form_container';
import Modal from '../modal/modal';

class ServerIndex extends React.Component {
  componentDidMount() {
    this.props.fetchServers();
  }

  render() {
    const { servers, currentUser, openModal } = this.props;
    return (
      <div className="server-index-container">
        <ul>
          { servers.map(server => (
              <ServerIndexItem key={server.id} server={server} />
            ))
          }
          <li className="server-new"
          onClick={() => openModal('newServer')}><i className="fas fa-plus"></i></li>
        </ul>
      </div>
    )
  }
}

export default ServerIndex;
