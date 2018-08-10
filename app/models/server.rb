class Server < ApplicationRecord

  DEFAULT_PHOTO_URL = "https://s3-us-west-1.amazonaws.com/disgo-dev/server_img.png"

  validates :name, :img_url, presence: true
  validates :name, uniqueness: true

  belongs_to :owner,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :User

  has_one_attached :photo

  after_initialize :ensure_img_url

  private
  def ensure_img_url
    self.img_url ||= DEFAULT_PHOTO_URL
  end

end
