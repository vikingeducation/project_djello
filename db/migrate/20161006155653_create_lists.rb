class CreateLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.references :board
      t.string :title
      t.string :description
      t.timestamps
    end
  end
end
