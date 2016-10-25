class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title
      t.text :description
      t.integer :user_id
      t.integer :board_id

      t.timestamps null: false
    end

    add_index :lists, :user_id
    add_index :lists, :board_id
  end
end
