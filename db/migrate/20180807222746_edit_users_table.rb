class EditUsersTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :salt
    add_column :users, :salt, :string, null: false
  end
end
