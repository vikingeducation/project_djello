class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :list_id
      t.string :title
      t.text :description
      t.boolean :completed

      t.timestamps null: false
    end
  end
end
