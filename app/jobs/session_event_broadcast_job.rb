class SessionEventBroadcastJob < ApplicationJob
  def perform(data, type)
    ActionCable
      .server
      .broadcast(
        "appearance_channel",
        userId: data.user_id,
        type: type
      )
  end
end
