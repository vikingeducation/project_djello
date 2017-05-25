class RemoveUserColumnFromBoard < ActiveRecord::Migration[5.0]
  def change
    remove_column :boards, :user_id
  end
end
