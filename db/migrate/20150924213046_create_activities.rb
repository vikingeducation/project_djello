class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :card_id
      t.integer :user_id
      t.string :action

      t.timestamps null: false
    end
  end
end
