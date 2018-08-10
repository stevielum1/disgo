class CreateServerMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :server_memberships do |t|
      t.integer :user_id, null: false, index: true
      t.integer :server_id, null: false, index: true
      t.timestamps
    end

    add_index :server_memberships, [:user_id, :server_id], unique: true
  end
end
