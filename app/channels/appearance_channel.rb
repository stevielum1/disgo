class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance_channel"
  end

  def unsubscribed
  end

  def create(options)
    Session.create(
      user_id: options.fetch("userId")
    )
  end

  def destroy(options)
    Session.find_by(user_id: options.fetch("userId")).destroy
  end
end
