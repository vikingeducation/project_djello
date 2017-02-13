class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.text :activity
      t.integer :user_id
      t.integer :card_id

      t.timestamps
    end
  end
end
