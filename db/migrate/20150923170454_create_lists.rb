class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :listname,    null: false
      t.integer :board_id,   null: false

      t.timestamps null: false
    end
  end
end
