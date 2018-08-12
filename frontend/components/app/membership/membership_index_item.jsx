import React from 'react';

const MembershipIndexItem = ({ member }) => {
  return (
    <li>
      <img className="member-photo" src={member.photoUrl} />
      <p>{member.username}</p>
    </li>
  )
};

export default MembershipIndexItem;
