import React from 'react';
import MembershipIndexItem from './membership_index_item';

class MembershipIndex extends React.Component {
  render() {
    return (
      <div className="membership-index-container">
        <h1>Members</h1>
        <ul>
          {
            this.props.members.map(member => (
              <MembershipIndexItem
                key={member.id}
                member={member} />
            ))
          }
        </ul>
      </div>
    )
  }
}

export default MembershipIndex;
