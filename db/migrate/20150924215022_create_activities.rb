class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.text :message
      t.string :recordable_type
      t.integer :recordable_id
      t.timestamps null: false
    end
  end
end
