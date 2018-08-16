class SessionEventBroadcastJob < ApplicationJob
  def perform(session, type)
    ActionCable
      .server
      .broadcast(
        "AppearanceChannel",
        userId: session.user_id,
        type: type
      )
  end
end
