export const createMembership = data => (
  $.ajax({
    method: 'POST',
    url: `/api/memberships/${data.serverId}`,
    data: { data }
  })
);

export const deleteMembership = serverId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/memberships/${serverId}`
  })
);
