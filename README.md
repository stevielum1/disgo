# DISGO

[Disgo](http://disgo.herokuapp.com/#/) is a clone of the popular chat app [Discord](https://discordapp.com/). Users are able to create and join servers, create text channels within servers and message each other through text channels or through direct messaging by simply clicking on a user.

Disgo was designed and built within a span of 10 days. Certain features were not implemented due to the time-constraint, though I plan to continue working on this project in the future.

![home_page](https://i.imgur.com/ILrB25U.png "Home page")

## Technologies
Disgo was built using React/Redux on the frontend and Ruby on Rails and PostgreSQL on the backend. Rails' ActionCable was used to implement the live chat features. All images, including the background image, user avatars, and server avatars, are hosted on [AWS S3](https://aws.amazon.com/s3/).

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
### Live Chat
In order to implement live chat, I needed to figure out Rails' ActionCable. Essentially, a direct connection is established between users. Updates occur on both the client and server sides. The client receives the new data and updates its current state, while the backend updates the database. This allows the client to have the newest information while not having to query our database every time a new update occurs.

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

### Online/Offline Appearance
Similarly, in order to show a user's online/offline status, I utilized ActionCable.

Due to the way I implemented user authentication, I had to create a `Sessions` table that holds user `id`s. If a user's `id` is present in this table, then that user is considered "online".

A row in the `Sessions` table is created when the WebSocket is created, and the corresponding row is deleted when the connection is closed.

```javascript
// frontend/components/app/membership/membership_index.jsx
that.appearances = cable.subscriptions.create( "AppearanceChannel", {
  connected: function() {
    this.perform('create', {
      userId: that.props.currentUser.id
    });
  },
// ...
  destroy: function() {
    this.perform('destroy', {
      userId: that.props.currentUser.id
    })
  }
})
```
```ruby
# app/channels/appearance_channel.rb
  #...
  def create(options)
    Session.create(
      user_id: options.fetch("userId")
    )
  end

  def destroy(options)
    Session.find_by(user_id: options.fetch("userId")).destroy
  end
  #...
```

I stored an array of user `id`s in the Redux state that initially fetches all the user `id`s in the `Sessions` table.
```javascript
// sample state
// ...
  loading: {
    online: [1,7,15,21]
  }
// ...
```

The store gets updated through our `received` callback, again depending on `data.type`.
```javascript
// frontend/components/app/membership/membership_index.jsx
  received: data => {
    if (data.type === "login") {
      let onlineUsers = [...that.state.onlineUsers];
      onlineUsers.push(data.userId);
      that.props.userLoggedIn(data.userId);
      that.setState({ onlineUsers });
    } else {
      let offlineIndex = that.state.onlineUsers.indexOf(data.userId);
      let newOnlineUsers = that.state.onlineUsers.slice(0, offlineIndex).concat(that.state.onlineUsers.slice(offlineIndex+1));
      that.props.userLoggedOut(data.userId);
      that.setState({ onlineUsers: newOnlineUsers });
    }
  }
```

The component can then easily find which users are online like so:
```javascript
const onlineMembers = members.filter(member => (
  this.state.onlineUsers.includes(member.id)
));
```
and give the element a class if they are online
``` javascript
// frontend/components/app/membership/membership_index_item.jsx
  <li
    className="member-info"
    onClick={handleDMCallback}>
    <img className={"member-photo" + `${online ? "" : " member-photo-offline"}`} src={member.photoUrl} />
    <p className={`${online ? "" : " member-username-offline"}`}>{member.username}</p><span>{crown}</span>
  </li>
```

## Features to be implemented
- Voice chat
- Video chat
- Friends
- Private servers
- Multiple admins per server
- Assign color to users

Please see the [wiki](https://github.com/stevielum1/disgo/wiki) for more detailed information.
