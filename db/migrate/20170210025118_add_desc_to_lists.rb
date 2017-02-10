class AddDescToLists < ActiveRecord::Migration[5.0]
  def change
    add_column :lists, :desc, :text
  end
end
