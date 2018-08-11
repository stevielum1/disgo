export const createChannel = channel => (
  $.ajax({
    method: 'POST',
    url: '/api/channels',
    data: { channel }
  })
);

export const updateChannel = channel => (
  $.ajax({
    method: 'PATCH',
    url: `/api/channels/${channel.id}`,
    data: { channel }
  })
);

export const deleteChannel = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/channels/${id}`
  })
);
