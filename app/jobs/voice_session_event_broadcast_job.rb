class VoiceSessionEventBroadcastJob < ApplicationJob
  def perform(data, type)
    ActionCable
      .server
      .broadcast(
        "voice_channel_#{data.channel_id}",
        userId: data.user_id,
        channelId: data.channel_id,
        type: type
      )
  end
end
