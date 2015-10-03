class CreateUserBoards < ActiveRecord::Migration
  def change
    create_table :user_boards do |t|
      t.integer :user_id, null: false
      t.integer :board_id, null: false
      t.string :role, null: false

      t.timestamps null: false
    end

    add_index :user_boards, [:user_id, :board_id], :unique => true
  end
end
