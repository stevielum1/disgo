class AddUniqueToUserIdInSessions < ActiveRecord::Migration[5.2]
  def change
    add_index :sessions, :user_id, unique: true
  end
end
