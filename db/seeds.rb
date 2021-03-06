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
    text_channel = {
      name: "general",
      server_id: server.id,
      destructible: false
    }
    text_channel = Channel.create(text_channel)
    channels << text_channel

    voice_channel = {
      name: "general",
      server_id: server.id,
      destructible: false,
      channel_type: 1
    }

    Channel.create(voice_channel)

    3.times do
      text_channel = {
        name: Faker::ElderScrolls.unique.city,
        server_id: server.id,
        destructible: true
      }
      text_channel = Channel.create(text_channel)
      channels << text_channel
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

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "csgo?")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "yea lemme finish this game first")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "we only play garbage maps")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "like office and dust")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "thats fine")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "need a break from dust2 once in a while")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "tell me when you're done with your game")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ill be practicing my one deags")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "gotcha")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "donezo")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "k invited")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "did you win your last game")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "btw my friend likes troll with the negev")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "nope got rekt")
  m.created_at = 51.minutes.from_now
  m.save
end

def create_dm4(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "have you looked at haseebs blog")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "he has a blog?")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ye")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "https://haseebq.com/the-time-i-had-to-crack-my-own-reddit-password/")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "lol")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "haseeb guy is so good that he had to hack himself")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "lol you right")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "he makes it sound so easy")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i wouldnt even know where to start if i was in that situation")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "id just make a new reddit account")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "not wurf the time to make a program AND design an algorithm to crack it")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "haseebs insane")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "the hero we need but dont deserve")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "no wonder why he left app academy")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ya teaching us idiots lol")
  m.created_at = 53.minutes.from_now
  m.save
end

def create_dm5(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "https://github.com/appacademy/sf-job-search-curriculum/tree/master/algorithms/graphs/project/firstname_lastname")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "wat")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "what the heck is tarjans algorithm")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i read it like 5 times and the wording is still confusing")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i didnt do this yet")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "still on khans algorithm")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "from what i understand")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "we need to do dfs on each vertex and break if we reach a vertex that we saw or we reach a leaf node")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "but how to do it in code lol")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "lemme finish khan first")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "yo this tarjans is weird")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ikr")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i think i got it")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "but im borked when test the cyclic graph lol")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "gg dude")
  m.created_at = 53.minutes.from_now
  m.save
end

def create_dm6(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "https://www.youtube.com/watch?v=h-0G_FI61a8")

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "good song")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "classic zanarkand always relaxing")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "this too")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "https://www.youtube.com/watch?v=HTUq3Ik1GHM")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i personally like this better")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "https://www.youtube.com/watch?v=UigzN-4JR14")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "they both good")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i started with kh2 so im used to that one")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "but kh3 tho")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ya, but why is this guy in the game lol")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "https://i.ytimg.com/vi/zjzNHwq3hnk/maxresdefault.jpg")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "cause disney")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "they do what they want")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "and square enix running out of characters lol")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "truuuu")
  m.created_at = 53.minutes.from_now
  m.save
end

def create_dm7(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "you watching?")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "the tourney?")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ya")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "cloud9 gonna win for once :o")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ya i know")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i give all the credit to stewie")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "he's crazy good")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "lol that reminds me about this video of him")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "https://www.youtube.com/watch?v=PSFgavZAjCY")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "lol i love that video")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "that guy makes some funny videos")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "random moe shaming in a stewie video made my day")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "AYYYY C9 LETS GO")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "WORLD CHAMPS")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "STEWIE MVP")
  m.created_at = 53.minutes.from_now
  m.save
end

def create_dm8(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "fortnite?")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "fart night")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ye hurry up")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "gotta get all our fashion before the season ends")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "just us 2?")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i got another friend we can play with")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "cool we can squad up")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "tell your friend that we always drop risky reels")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "isolated, yet good enough for drops")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ya he knows")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i already converted him to risky")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "lol nicee")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "https://i.ytimg.com/vi/WOd0pSkifY0/maxresdefault.jpg")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "EZ GAME")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i did nothing that whole game")
  m.created_at = 53.minutes.from_now
  m.save
end

def create_dm9(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "explain in place quicksort to me")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "which part")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "all of it lol")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "what is partition supposed to do")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "partition just takes the first element in the array and puts it in the correct spot")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "its just making the first element the pivot and separting the array into lower, pivot, and upper")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "you need that barrier right")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "to iterate through and swap stuff if its lower or higher than the pivot?")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i have no idea what it returns either")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ya basically")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "according to the specs it returns the index of the pivot in the sorted array")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "oh okay")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i finally got it after thinking about it in the shower")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "just had to clear my head for a bit")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "r/showerthoughts? lol")
  m.created_at = 53.minutes.from_now
  m.save
end

def create_dm10(demo_user, dm_user)
  dm_server = Server.create!(name: "Direct Message_#{demo_user.id}_#{dm_user.id}", owner_id: demo_user.id)

  ServerMembership.create(user_id: demo_user.id, server_id: dm_server.id)
  ServerMembership.create(user_id: dm_user.id, server_id: dm_server.id)

  dm_channel = Channel.create(name: "Direct Message", server_id: dm_server.id)

  Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "where you applying")

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "all them 120k+ jobs")
  m.created_at = 5.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "sick")
  m.created_at = 6.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "you gonna negotiate?")
  m.created_at = 6.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "idk i might")
  m.created_at = 10.minutes.from_now
  m.save
  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "it just feels awkward trying to haggle for literally my first job")
  m.created_at = 11.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ya i know lol")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "but hey they say it worked out for previous students")
  m.created_at = 11.minutes.from_now
  m.save
  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ima apply to places in the city, not open to relocating")
  m.created_at = 12.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "i hear ya")
  m.created_at = 13.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "that's why you applied to app academy in the first place right")
  m.created_at = 30.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "ya")
  m.created_at = 31.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i mentioned in my non technical interview that i applied to app academy to get a job in sf")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: demo_user.id, channel_id: dm_channel.id, content: "i dont even know if there are 40+ jobs in sf")
  m.created_at = 50.minutes.from_now
  m.save

  m = Message.create(author_id: dm_user.id, channel_id: dm_channel.id, content: "ya you gonna run out fast")
  m.created_at = 53.minutes.from_now
  m.save
end

demo_user = User.find(1)
users.each_with_index do |dm_user, i|
  next if dm_user == demo_user
  self.send("create_dm#{i}".to_sym, demo_user, dm_user)
end
