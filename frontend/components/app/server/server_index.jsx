import React from 'react';
import ServerIndexItem from './server_index_item';
import CreateServerFormContainer from './create_server_form_container';
import Modal from '../modal/modal';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateLoading(true);
    this.props.fetchServers()
      .then(() => this.props.updateLoading(false));
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.memberships.length !== nextProps.memberships.length) || (this.props.servers.length !== nextProps.servers.length)) {
      this.props.fetchServers();
    }
  }

  render() {
    if (this.props.loading) return null;

    const { servers, currentUser, openModal, channels, loading } = this.props;
    return (
      <div className="server-index-container">
        <ul>
          { servers.map(server => {
              const firstChannel = channels.filter(channel => (
                channel.serverId === server.id
              ))[0];
              return <ServerIndexItem
                key={server.id}
                server={server}
                channel={firstChannel}
                loading={loading} />
            })
          }
          <li className="server-new"
          onClick={() => openModal('newServer')}><i className="fas fa-plus"></i></li>
        </ul>
      </div>
    )
  }
}

export default ServerIndex;
