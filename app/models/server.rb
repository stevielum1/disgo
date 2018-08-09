class Server < ApplicationRecord
  validates :name, :img_url, presence: true
  validates :name, uniqueness: true

  belongs_to :owner,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :User

  has_one_attached :photo

  before_save :require_photo
  after_initialize :ensure_img_url

  private
  def ensure_img_url
    self.img_url = "server_img.png"
  end

  def require_photo
    unless self.photo.attached?
      file = File.open('app/assets/images/server_img.png')
      self.photo.attach(io: file, filename: 'server_img.png')
    end
  end
end
