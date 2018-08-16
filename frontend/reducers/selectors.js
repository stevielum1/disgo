export const getMembership = (state, userId, serverId) => {
  return Object.values(state.entities.serverMemberships)
    .filter(membership => {
      return (membership.userId === userId) && (membership.serverId === serverId);
    })[0];
};

export const getChannels = (state, serverId) => {
  return Object.values(state.entities.channels)
    .filter(channel => {
      return channel.serverId === serverId;
    });
};

export const getFirstChannel = (state, serverId) => {
  const channels = Object.values(state.entities.channels);
  for(let i = 0; i < channels.length; i++) {
    if (channels[i].serverId === serverId) return channels[i];
  }
};

export const getMembers = (state, serverId) => {
  const memberships = Object.values(state.entities.serverMemberships)
    .filter(membership => {
      return (membership.serverId === serverId);
    });

  let users = [];
  memberships.forEach(membership => {
    users.push(state.entities.users[membership.userId]);
  });

  return users;
};

export const getMessages = (state, channelId) => {
  return Object.values(state.entities.messages)
    .filter(message => {
      return message.channelId === channelId;
    });
};

export const getUsersWithoutCurrentUser = (state, currentUserId) => {
  return Object.values(state.entities.users)
    .filter(user => user.id !== currentUserId);
};

export const isMember = (state, serverId, userId) => {
  const memberships = Object.values(state.entities.serverMemberships);
  for (let i = 0; i < memberships.length; i++) {
    if (memberships[i].serverId === parseInt(serverId) && memberships[i].userId === userId) return true;
  }
  return false;
};
