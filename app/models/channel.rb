class Channel < ApplicationRecord
  CHANNEL_TYPES = {
    0 => "TEXT",
    1 => "VOICE"
  }

  validates :name, :channel_type, presence: true
  validates :channel_type, inclusion: { in: CHANNEL_TYPES.keys }

  belongs_to :server,
  primary_key: :id,
  foreign_key: :server_id,
  class_name: :Server

  after_initialize :ensure_channel_type

  private
  def ensure_channel_type
    self.channel_type = 0
  end
end
