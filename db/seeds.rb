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

10.times do
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
  timer = 0;
  30.times do
    message = {
      content: contents.sample,
      author_id: members.sample.id,
      channel_id: channel.id
    }
    m = Message.create(message)
    m.created_at = timer.minutes.from_now
    m.save
    timer += 1
  end
end

demo_user = User.find(1)
users[1..-1].each do |dm_user|
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "hey get on steam")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "im already on")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "oh")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "lets play some monster hunter world")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ill play in like 15 minutes")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i just gotta finish up some hw")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "okay")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ill be grinding for a new weapon")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "join my room when you're done")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "for sure")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "im ready to hunt some monsters")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "lets gooooo")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "https://assets.vg247.com/current//2018/01/monster_hunter_world_Nergigante_Art.jpg")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "this game is too good")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "https://www.reddit.com/r/MonsterHunterWorld/")
  m.created_at = 53.minutes.from_now
  m.save
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
