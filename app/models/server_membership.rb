class ServerMembership < ApplicationRecord
  validate :unique_user_server

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :server,
  primary_key: :id,
  foreign_key: :server_id,
  class_name: :Server

  private
  def unique_user_server
    return if self.server_id.nil?
    membership = ServerMembership
      .where(user_id: self.user_id)
      .where(server_id: self.server_id)
    unless membership.empty?
      errors[:membership] << "already exists"
    end
  end
end
