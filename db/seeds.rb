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
users.each_with_index do |dm_user, i|
  next if dm_user == demo_user
  self.send("create_dm#{i}".to_sym, demo_user, dm_user)
end

def create_dm1(demo_user, dm_user)
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

def create_dm2(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "how do i implement delete for a binary search tree?")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "recursion")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "that doesnt help")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i needa somehow set my left or right pointer on the parent to nil but i dont have access to parent in my bst node")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "you can always add a parent to your node class")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "thats what i ended up doing")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "okay")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ill try your way")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "there should be a way to do it without having to specify a parent tho")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ye but too lazy")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "https://github.com/appacademy/sf-job-search-curriculum/blob/master/w12/day5.md")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "im done")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "so easy with parent")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "always feel like i do trivial solution")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "lol same")
  m.created_at = 53.minutes.from_now
  m.save
end

def create_dm3(demo_user, dm_user)
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

def create_dm4(demo_user, dm_user)
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

def create_dm5(demo_user, dm_user)
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

def create_dm6(demo_user, dm_user)
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

def create_dm7(demo_user, dm_user)
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

def create_dm8(demo_user, dm_user)
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

def create_dm9(demo_user, dm_user)
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