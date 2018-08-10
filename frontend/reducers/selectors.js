export const getMembership = (state, userId, serverId) => {
  return Object.values(state.entities.serverMemberships)
    .filter(membership => {
      return (membership.userId === userId) && (membership.serverId === serverId);
    })[0];
};
