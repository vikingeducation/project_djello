class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :user_id, null: false
      t.integer :card_id, null: false
      t.string :action, null: false

      t.timestamps null: false
    end
  end
end
