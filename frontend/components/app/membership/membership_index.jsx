import React from 'react';
import MembershipIndexItem from './membership_index_item';

class MembershipIndex extends React.Component {
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

    return (
      <div className="app-memberships-column">
        <div className="membership-index-container">
          <h1>Members</h1>
          <ul className="membership-list">
            {
              members.map(member => {
                return <MembershipIndexItem
                  key={member.id}
                  member={member}
                  server={server}
                  currentUser={currentUser}
                  memberships={memberships}
                  servers={servers}
                  channels={channels}
                  createServer={createServer}
                  createMembership={createMembership}
                  createChannel={createChannel} />
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default MembershipIndex;
