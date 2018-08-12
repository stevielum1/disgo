class EditChannelsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :channels, :type
    add_column :channels, :channel_type, :integer, null: false
  end
end
