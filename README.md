# DISGO

[Disgo](http://disgo.herokuapp.com/#/) is a clone of the popular chat app [Discord](https://discordapp.com/). Users are able to create and join servers, create text channels within servers and message each other through text channels or through direct messaging by simply clicking on a user.

![home_page](https://i.imgur.com/ILrB25U.png "Home page")

## Technologies
Disgo was built using React/Redux on the frontend and Ruby on Rails and PostgreSQL on the backend. Rails' built-in ActionCable was used to implement the live chat features.

## Features
- #### Servers and Channels
  - Users have the ability to create servers
  - Users can join servers by entering a server name
  - Server owners (i.e. server creators) can edit their server's info, or delete the server altogether
  - Server members can leave the server at anytime
  - A default `#general` text channel is created for each server
  - Server owners can create, edit, and delete text channels
![servers_and_channels](https://i.imgur.com/bCeG8Vj.png "Servers and channels")

- #### Live Chat
  - Server members can chat with each other via text channels
  - Users can edit and delete their messages, and other users currently viewing the same screen will be able to see immediate changes
  - Links and images are parsed using regex to automatically create clickable links and embedded images
  - Direct messaging is available for more private conversations
![messaging](https://i.imgur.com/Zqj0MW1.png "Messaging")

## Challenges
In order to implement live chat, I had to figure out how Rails' ActionCable works. Essentially, a direct connection is established between users. Updates occur on both the client and server sides. The client receives the new data and updates its current state, while the backend updates the database. This allows the client to have the newest information while not having to query our database every time a new update occurs.

On the frontend, we create a WebSocket connection that subscribes the current user to the current text channel.
```javascript
// frontend/components/app/message/message_index.jsx
// ...
let cable = ActionCable.createConsumer(`ws://${location.host}/cable`);
that.chats = cable.subscriptions.create({
  channel: 'ChatChannel',
  channel_id: that.props.match.params.channelId
},
```
Whenever we receive a broadcast from our backend, depending on `data.type`, we update the current user's state so they have the most up-to-date information.
```javascript
received: data => {
  if (data.type === "destroy") {
    that.props.removeMessage(data.message.id);
  } else {
    that.props.receiveMessage(data.message);
  }
},
```
We can call the following functions to tell our backend to `perform` the corresponding action.
```javascript
create: function(message) {
  this.perform('create', {
    content: message.content,
    channelId: message.channelId,
    authorId: message.authorId
  });
},
update: function(message) {
  this.perform('update', {
    id: message.id,
    content: message.content,
    channelId: message.channelId,
    authorId: message.authorId
  })
},
delete: function(message) {
  this.perform('destroy', {
    id: message.id
  })
}
// ...
```

On the backend, we `perform` the action given to us by our frontend.
```ruby
# app/channels/chat_channel.rb
# ...
  def create(options)
    Message.create(
      content: options.fetch("content"),
      channel_id: options.fetch("channelId"),
      author_id: options.fetch("authorId")
    )
  end

  def update(options)
    Message.find(options.fetch("id")).update_attributes(
        content: options.fetch("content"),
        channel_id: options.fetch("channelId"),
        author_id: options.fetch("authorId")
      )
  end

  def destroy(options)
    Message.find(options.fetch("id")).destroy
  end
#...
```

We use Rails' ActiveRecord callbacks to broadcast (to our subscribers) after performing the action.
```ruby
# app/models/message.rb
#...
  after_create_commit do
    MessageCreationEventBroadcastJob.perform_later(self, "create")
  end

  after_destroy_commit do
    MessageCreationEventBroadcastJob.perform_now(self, "destroy")
  end

  after_update_commit do
    MessageCreationEventBroadcastJob.perform_now(self, "update")
  end
#...
```
```ruby
# app/jobs/message_creation_event_broadcast_job.rb
#...
  def perform(message, type)
    ActionCable
      .server
      .broadcast(
        "chat_channel_#{message.channel_id}",
        message: {
          id: message.id,
          content: message.content,
          authorId: message.author_id,
          channelId: message.channel_id,
          createdAt: message.created_at.strftime('%l:%M %p'),
          updatedAt: message.updated_at.strftime('%l:%M %p'),
        },
        type: type
      )
  end
#...
```

## Features to be implemented
- Voice chat
- Video chat
- Friends
- Private servers
- Multiple admins per server
- Assign color to users

Please see the [wiki](https://github.com/stevielum1/disgo/wiki) for more detailed information.
