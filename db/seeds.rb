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
    username: Faker::Internet.username(name) + rand(1..1000).to_s,
    email: Faker::Internet.free_email(name),
    password: Faker::Internet.password(6)
  }
  user = User.create(user)
  users << user
end

servers = []

5.times do
  user = users.sample
  server = {
    name: Faker::ElderScrolls.unique.region,
    owner_id: user.id
  }
  server = Server.create(server)
  servers << server

  ServerMembership.create(user_id: user.id, server_id: server.id)
end

users.each do |user|
  count = 0
  until count >= 3
    membership = ServerMembership.new(user_id: user.id, server_id: servers.sample[:id])
    count += 1 if membership.save
  end
end

channels = []

servers.each do |server|
    channel = {
      name: "general",
      server_id: server.id,
      destructible: false
    }
    channel = Channel.create(channel)
    channels << channel

    3.times do
      channel = {
        name: Faker::ElderScrolls.unique.city,
        server_id: server.id,
        destructible: true
      }
      channel = Channel.create(channel)
      channels << channel
    end
    Faker::ElderScrolls.unique.clear
end

contents = File.readlines('app/assets/skyrim.txt')

channels.each do |channel|
  members = channel.server.members
  30.times do
    message = {
      content: contents.sample,
      author_id: members.sample.id,
      channel_id: channel.id
    }
    Message.create(message)
  end
end


# servers = []
#
# 10.times do
#   server = {
#     name: Faker::Space.moon + " " + Faker::Space.star,
#     owner_id: users.sample[:id]
#   }
#   server = Server.create(server)
#   servers << server
# end
#
# users.each do |user|
#   membership = ServerMembership.new(user_id: user.id, server_id: servers.sample[:id])
#   membership.save
# end
#
# servers.each do |server|
#   channel = {
#     name: "general",
#     server_id: server.id,
#     destructible: false
#   }
#   Channel.create(channel)
#
#   3.times do
#     channel = {
#       name: Faker::Space.moon + " " + Faker::Space.star,
#       server_id: server.id,
#       destructible: true
#     }
#     Channel.create(channel)
#   end
# end
