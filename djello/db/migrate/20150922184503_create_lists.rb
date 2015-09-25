class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.references :board, null: false
      t.timestamps null: false
    end
  end
end
