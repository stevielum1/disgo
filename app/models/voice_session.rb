class VoiceSession < ApplicationRecord
  validates :user_id, uniqueness: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :channel,
  primary_key: :id,
  foreign_key: :channel_id,
  class_name: :Channel

  after_create_commit do
    VoiceSessionEventBroadcastJob.perform_now(self, "join")
  end

  after_destroy_commit do
    VoiceSessionEventBroadcastJob.perform_now(self, "leave")
  end
end
