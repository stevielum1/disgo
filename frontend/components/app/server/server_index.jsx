import React from 'react';
import ServerIndexItem from './server_index_item';
import CreateServerFormContainer from './create_server_form_container';
import Modal from '../modal/modal';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.props.updateLoading(true);
    this.props.fetchServers()
      .then(() => this.props.updateLoading(false));
  }

  static getDerivedStateFromProps(props, state) {
    const { servers, memberships, channels } = props;
    if (state.servers.length !== servers.length) {
      return props;
    }
    if (state.memberships.length !== memberships.length) {
      return props;
    }
    if (state.channels.length !== channels.length) {
      return props;
    }
    return state;
  }

  render() {
    if (this.props.loading) return null;

    const { servers, currentUser, openModal, channels, loading } = this.props;

    const nonDMServers = servers.filter(server => (
      !server.name.includes("Direct Message")
    ));

    return (
      <div className="server-index-container">
        <ul>
          { nonDMServers.map(server => {
              const firstTextChannel = channels.filter(channel => (
                channel.serverId === server.id && channel.type === "TEXT"
              ))[0];
              return <ServerIndexItem
                key={server.id}
                server={server}
                channel={firstTextChannel}
                loading={loading} />;
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
