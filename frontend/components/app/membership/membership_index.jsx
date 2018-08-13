import React from 'react';
import MembershipIndexItem from './membership_index_item';

class MembershipIndex extends React.Component {
  render() {
    const { members, server } = this.props;

    if (server === undefined) return <div>Loading...</div>;

    return (
      <div className="membership-index-container">
        <h1>Members</h1>
        <ul>
          {
            members.map(member => {
              const owner = server.ownerId === member.id;
              return <MembershipIndexItem
                key={member.id}
                member={member}
                owner={owner} />
            })
          }
        </ul>
      </div>
    )
  }
}

export default MembershipIndex;
