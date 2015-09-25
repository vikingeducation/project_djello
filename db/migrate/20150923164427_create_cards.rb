class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
