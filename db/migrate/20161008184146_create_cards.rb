class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.text :text
      t.integer :list_id
      t.boolean :completed
      t.timestamps null: false
    end
    add_index :cards, :list_id
  end
end
