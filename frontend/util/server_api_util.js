export const fetchServers = id => (
  $.ajax({
    method: 'GET',
    url: `/api/servers`,
    data: {
      id: id
    }
  })
);

export const createServer = server => (
  $.ajax({
    method: 'POST',
    url: `/api/servers`,
    data: { server }
  })
);

export const updateServer = server => (
  $.ajax({
    method: 'PATCH',
    url: `/api/servers/${server.id}`,
    data: { server }
  })
);

export const deleteServer = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/servers/${id}`
  })
);