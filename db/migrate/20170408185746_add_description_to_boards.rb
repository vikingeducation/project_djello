class AddDescriptionToBoards < ActiveRecord::Migration[5.0]
  def change
    add_column :boards, :description, :text
  end
end
