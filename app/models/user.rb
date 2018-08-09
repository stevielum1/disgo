class User < ApplicationRecord
  validates :username, :salt, :email, :img_url, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :owned_servers,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :Server

  has_one_attached :photo

  after_initialize :ensure_session_token, :ensure_salt, :ensure_img_url
  before_create :require_photo

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def ensure_salt
    salt = ""
    4.times do
      salt += rand(0..9).to_s
    end
    self.salt = salt
  end

  def ensure_img_url
    self.img_url = "user_img_#{rand(1..4)}.jpg"
  end

  def require_photo
    unless self.photo.attached?
      filename = "user_img_#{rand(1..4)}.jpg"
      file = File.open("app/assets/images/#{filename}")
      self.photo.attach(io: file, filename: filename)
    end
  end
end
