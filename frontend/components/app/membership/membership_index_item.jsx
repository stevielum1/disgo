import React from 'react';

const MembershipIndexItem = ({ member, owner }) => {
  const crown = owner ? " 👑" : null;
  return (
    <li>
      <img className="member-photo" src={member.photoUrl} />
      <p>{member.username}{crown}</p>
    </li>
  )
};

export default MembershipIndexItem;
