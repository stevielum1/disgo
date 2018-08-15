import React from 'react';
import MembershipIndexItem from './membership_index_item';

class MembershipIndex extends React.Component {
  render() {
    if (this.props.loading) return null;

    const {
      members,
      server,
      currentUser,
      memberships,
      servers,
      channels,
      createServer,
      createMembership,
      createChannel
    } = this.props;

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
