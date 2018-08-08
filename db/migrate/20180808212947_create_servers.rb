class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.string :img_url, null: false
      t.integer :owner_id, null: false
      t.timestamps
    end

    add_index :servers, :name, unique: true
    add_index :servers, :owner_id
  end
end
