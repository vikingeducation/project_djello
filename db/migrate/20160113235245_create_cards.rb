class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
    	t.integer :list_id, null: false
    	t.string :content
    	t.integer :type

      t.timestamps null: false
    end
  end
end
