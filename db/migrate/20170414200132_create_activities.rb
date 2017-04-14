class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.string :description, null: false
      t.string :user_id, null: false
      t.string :card_id, null: false

      t.timestamps
    end
  end
end
