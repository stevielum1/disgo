class ServerMembership < ApplicationRecord
  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :server,
  primary_key: :id,
  foreign_key: :server_id,
  class_name: :Server
end
