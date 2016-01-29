class AddListIdToCard < ActiveRecord::Migration
  def change
    add_column :cards, :list_id, :integer
  end
end
