export const fetchServers = () => (
  $.ajax({
    method: 'GET',
    url: `/api/servers`
  })
);

export const createServer = formData => (
  $.ajax({
    method: 'POST',
    url: `/api/servers`,
    data: formData,
    contentType: false,
    processData: false
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
