class AddBoardIdToLists < ActiveRecord::Migration
  def change
    add_column :lists, :board_id, :integer
  end
end
