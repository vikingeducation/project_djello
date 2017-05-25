class CreateBoards < ActiveRecord::Migration[5.0]
  def change
    create_table :boards do |t|
      t.string :title, null: false, default: "new board"

      t.timestamps
    end
  end
end
