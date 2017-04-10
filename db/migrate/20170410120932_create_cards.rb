class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.text :description
      t.integer :user_id, null: false
      t.integer :list_id, null: false
      t.boolean :completed, null: false, default: false

      t.timestamps
    end
  end
end
