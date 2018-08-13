class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel_#{params[:channel_id]}"
  end

  def unsubscribed
  end

  def create(options)
    Message.create(
      content: options.fetch("content"),
      channel_id: options.fetch("channelId"),
      author_id: options.fetch("authorId")
    )
  end
end
