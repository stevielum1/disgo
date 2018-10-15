class VoiceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "voice_channel_#{params[:channel_id]}"
  end

  def unsubscribed
  end

  def create(options)
    VoiceSession.create(
      user_id: options.fetch("userId"),
      channel_id: options.fetch("channelId")
    )
  end

  def destroy(options)
    VoiceSession.find_by(user_id: options.fetch("userId")).destroy
  end
end
