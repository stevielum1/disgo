class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

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
end
