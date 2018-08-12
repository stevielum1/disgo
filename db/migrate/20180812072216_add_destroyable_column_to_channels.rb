class AddDestroyableColumnToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :destructible, :boolean, null: false, default: true
  end
end
