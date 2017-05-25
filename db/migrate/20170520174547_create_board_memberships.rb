class CreateBoardMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :board_memberships do |t|
      t.integer :board_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
