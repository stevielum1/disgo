class CreateSessionsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions_tables do |t|
      t.integer :user_id, null: false, index: true
      t.timestamps
    end
  end
end
