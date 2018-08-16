class EditNameOfSessionsTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :sessions_tables
    create_table :sessions do |t|
      t.integer :user_id, null: false, index: true
      t.timestamps
    end
  end
end
