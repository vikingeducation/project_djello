class AddDefaultsforBoardNLists < ActiveRecord::Migration
  def change
    change_column_default(:boards, :title, "New Board")
    change_column_default(:lists, :title, "New List")
    change_column_default(:lists, :description, "Add a description...")
  end
end
