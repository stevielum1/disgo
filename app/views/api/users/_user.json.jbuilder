json.extract! user, :id, :username, :email, :salt

if user.photo.attached?
  json.photoUrl url_for(user.photo)
else
  json.photoUrl user.img_url
end
