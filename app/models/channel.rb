class Channel < ApplicationRecord
  TYPES = {
    0 => "TEXT",
    1 => "VOICE"
  }

  validates :name, :type, presence: true
  validates :type, inclusion: { in: TYPES.keys }

  belongs_to :server,
  primary_key: :id,
  foreign_key: :server_id,
  class_name: :Server

  after_initialize :ensure_type

  private
  def ensure_type
    self.type = 0
  end
end
