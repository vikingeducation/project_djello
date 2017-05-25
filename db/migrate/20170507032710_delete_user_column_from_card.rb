class DeleteUserColumnFromCard < ActiveRecord::Migration[5.0]
  def change
    remove_column :cards, :user_id
  end
end
