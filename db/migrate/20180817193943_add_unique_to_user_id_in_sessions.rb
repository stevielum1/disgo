class AddUniqueToUserIdInSessions < ActiveRecord::Migration[5.2]
  def change
    remove_column :sessions, :user_id
    add_column :sessions, :user_id, :integer, null: false
    add_index :sessions, :user_id, unique: true
  end
end
