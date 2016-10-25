class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.text :description
      t.string :title, null: false
      t.integer :list_id, null: false
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
