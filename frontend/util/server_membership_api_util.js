export const createMembership = data => (
  $.ajax({
    method: 'POST',
    url: `/api/memberships`,
    data: {
      name: data.name,
      membership: {
        server_id: data.serverId
      }
    }
  })
);
