export const updateUser = formData => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${formData.user.id}`,
    data: formData,
    contentType: false,
    processData: false
  })
);
