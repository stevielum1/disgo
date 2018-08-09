json.extract! server, :id, :name, :owner_id

if server.photo.attached?
  json.photoUrl url_for(server.photo)
else
  json.photoUrl server.img_url
end
