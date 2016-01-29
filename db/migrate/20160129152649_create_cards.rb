class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false, default: 'New Card'
      t.text :description, null: false, default: 'Add a description'
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
