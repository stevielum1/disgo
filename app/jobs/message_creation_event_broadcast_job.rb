class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable
      .server
      .broadcast(
        "chat_channel",
        id: message.id,
        content: message.content,
        authorId: message.author_id,
        channelId: message.channel_id,
        createdAt: message.created_at.strftime('%l:%M %p'),
        updatedAt: message.updated_at.strftime('%l:%M %p')
      )
  end
end
