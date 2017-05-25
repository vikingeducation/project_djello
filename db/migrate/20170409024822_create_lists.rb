class CreateLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.string :title, null: false, default: "new board"
      t.text :description
      t.integer :user_id, null: false
      t.integer :board_id, null: false

      t.timestamps
    end
  end
end
