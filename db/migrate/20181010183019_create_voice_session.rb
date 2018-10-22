class CreateVoiceSession < ActiveRecord::Migration[5.2]
  def change
    create_table :voice_sessions do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false
    end

    add_index :voice_sessions, :user_id, unique: true
  end
end
