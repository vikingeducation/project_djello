class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|

      t.string :title
      t.text :description
      t.references :list
      t.references :user
      t.references :board

      t.timestamps
    end
  end
end
