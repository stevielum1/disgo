class Server < ApplicationRecord
  validates :name, :img_url, presence: true
  validates :name, uniqueness: true

  belongs_to :owner,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :User

  after_initialize :ensure_img_url

  private
  def ensure_img_url
    self.img_url = "default_img_url"
  end
end
