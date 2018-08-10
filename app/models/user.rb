class User < ApplicationRecord

  DEFAULT_PHOTO_URLS = %w(https://s3-us-west-1.amazonaws.com/disgo-dev/user_img_1.jpg https://s3-us-west-1.amazonaws.com/disgo-dev/user_img_2.jpg https://s3-us-west-1.amazonaws.com/disgo-dev/user_img_3.jpg https://s3-us-west-1.amazonaws.com/disgo-dev/user_img_4.jpg)

  validates :username, :salt, :email, :img_url, :session_token, presence: true
  validates :email, uniqueness: true
  validates_uniqueness_of :username, :scope => [:salt]
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :owned_servers,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :Server

  has_one_attached :photo

  after_initialize :ensure_session_token, :ensure_salt, :ensure_img_url

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
    return if self.salt
    salt = ""
    4.times do
      salt += rand(0..9).to_s
    end
    self.salt = salt
  end

  def ensure_img_url
    self.img_url ||= DEFAULT_PHOTO_URLS.sample
  end
end
