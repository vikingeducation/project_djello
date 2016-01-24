class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.integer :owner_id, null: false

      t.timestamps null: false
    end
  end
end
