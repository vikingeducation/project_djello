class AddUserToBoard < ActiveRecord::Migration[5.0]
  def change
    add_column :boards, :user_id, :integer, null: false
  end
end
