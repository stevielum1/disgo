# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create({ username: "demo_disgo_user", email: "demo@disgo.com", password: "disgoPW" })

users = []
users << user

50.times do
  name = Faker::Name.unique.first_name
  user = {
    username: Faker::Internet.username(name),
    email: Faker::Internet.free_email(name),
    password: Faker::Internet.password(6)
  }
  user = User.create(user)
  users << user
end

servers = []

10.times do
  server = {
    name: Faker::Space.moon + " " + Faker::Space.star,
    owner_id: users.sample[:id]
  }
  server = Server.create(server)
  servers << server
end

users.each do |user|
  membership = ServerMembership.new(user_id: user.id, server_id: servers.sample[:id])
  membership.save
end
