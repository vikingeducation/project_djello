class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :card_id, null: false
      t.string :content, null: false

      t.timestamps null: false
    end
  end
end
