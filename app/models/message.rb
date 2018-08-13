class Message < ApplicationRecord
  validates :content, presence: true

  default_scope { order(created_at: :desc) }

  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

  belongs_to :channel,
  primary_key: :id,
  foreign_key: :channel_id,
  class_name: :Channel

  after_create_commit do
    MessageCreationEventBroadcastJob.perform_later(self)
  end
end
