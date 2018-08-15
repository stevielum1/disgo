export const createMembership = data => (
  $.ajax({
    method: 'POST',
    url: `/api/memberships`,
    data: {
      name: data.name,
      membership: {
        user_id: data.userId,
        server_id: data.serverId
      }
    }
  })
);

export const deleteMembership = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/memberships/${id}`
  })
);
