import React from 'react';
import MembershipIndexItem from './membership_index_item';

class MembershipIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: this.props.onlineUsers
    };
    this.createSocket();
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentCleanup() {
    //handle page refreshes
    this.appearances.destroy();
    this.appearances.unsubscribe();
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.memberships.length !== prevProps.memberships.length) {
      if (this.appearances) {
        this.appearances.unsubscribe();
      }
      this.createSocket();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.onlineUsers.length !== state.onlineUsers.length) {
      return {
        onlineUsers: props.onlineUsers
      };
    } else {
      return state;
    }
  }

  createSocket() {
    let that = this;

    let cable = ActionCable.createConsumer(`ws://${location.host}/cable`);
    that.appearances = cable.subscriptions.create("AppearanceChannel", {
        connected: function() {
          this.perform('create', {
            userId: that.props.currentUser.id
          });
        },
        disconnected: () => {},
        received: data => {
          if (data.type === "login") {
            let onlineUsers = [...that.state.onlineUsers];
            onlineUsers.push(data.userId);
            that.props.userLoggedIn(data.userId);
            that.setState({ onlineUsers });
          } else {
            let offlineIndex = that.state.onlineUsers.indexOf(data.userId);
            let newOnlineUsers = that.state.onlineUsers.slice(0, offlineIndex).concat(that.state.onlineUsers.slice(offlineIndex+1));
            that.props.userLoggedOut(data.userId);
            that.setState({ onlineUsers: newOnlineUsers });
          }
        },
        destroy: function() {
          this.perform('destroy', {
            userId: that.props.currentUser.id
          })
        }
      }
    )
  }

  render() {
    if (this.props.loading) return null;

    const {
      server,
      currentUser,
      memberships,
      servers,
      channels,
      createServer,
      createMembership,
      createChannel
    } = this.props;

    const members = this.props.members.sort((user1, user2) => (
      user1.username < user2.username ? -1 : 1
    ));

    const onlineMembers = members.filter(member => (
      this.state.onlineUsers.includes(member.id)
    ));

    const onlineHeading = onlineMembers.length === 0 ? null : (
      <h2>Online—{onlineMembers.length}</h2>
    );

    const offlineMembers = members.filter(member => (
      !this.state.onlineUsers.includes(member.id)
    ));

    const offlineHeading = offlineMembers.length === 0 ? null : (
      <h2>Offline—{offlineMembers.length}</h2>
    );

    return (
      <div className="app-memberships-column">
        <div className="membership-index-container">
          <ul className="membership-list">
            <ul className="membership-sub-list">
              {onlineHeading}
              {onlineMembers.map(member => (
                <MembershipIndexItem
                  key={member.id}
                  member={member}
                  server={server}
                  currentUser={currentUser}
                  memberships={memberships}
                  servers={servers}
                  channels={channels}
                  createServer={createServer}
                  createMembership={createMembership}
                  createChannel={createChannel}
                  online={true} />
              ))}
            </ul>
            <ul className="membership-sub-list">
              {offlineHeading}
              {offlineMembers.map(member => (
                <MembershipIndexItem
                  key={member.id}
                  member={member}
                  server={server}
                  currentUser={currentUser}
                  memberships={memberships}
                  servers={servers}
                  channels={channels}
                  createServer={createServer}
                  createMembership={createMembership}
                  createChannel={createChannel}
                  online={false} />
              ))}
            </ul>
          </ul>
        </div>
      </div>
    )
  }
}

export default MembershipIndex;
