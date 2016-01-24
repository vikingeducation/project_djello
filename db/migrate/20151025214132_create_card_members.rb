class CreateCardMembers < ActiveRecord::Migration
  def change
    create_table :card_members do |t|
      t.integer :card_id, null: false
      t.integer :member_id, null: false

      t.timestamps null: false
    end
  end
end
