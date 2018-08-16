class Session < ApplicationRecord
  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  after_create_commit do
    SessionEventBroadcastJob.perform_now(self, "login")
  end

  after_destroy_commit do
    SessionEventBroadcastJob.perform_now(self, "logout")
  end
end
