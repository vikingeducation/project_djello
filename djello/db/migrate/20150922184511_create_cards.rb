class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.references :list, null: false
      t.timestamps null: false
    end
  end
end
