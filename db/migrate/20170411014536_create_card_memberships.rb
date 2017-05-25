class CreateCardMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :card_memberships do |t|
      t.integer :card_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
