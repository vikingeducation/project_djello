class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.integer :user_id
      t.integer :card_id

      t.index [:user_id, :card_id], unique: true
      t.timestamps null: false
    end
  end
end
