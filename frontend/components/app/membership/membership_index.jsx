import React from 'react';
import MembershipIndexItem from './membership_index_item';

class MembershipIndex extends React.Component {
  render() {
    return (
      <div className="membership-index-container">
        <h1>Members</h1>
        <ul>
          {
            this.props.members.map(member => {
              const owner = this.props.server.ownerId === member.id;
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
