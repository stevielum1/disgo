export const createMembership = serverId => (
  $.ajax({
    method: 'POST',
    url: `/api/memberships`,
    data: {
      membership: { server_id: serverId }
    }
  })
);
