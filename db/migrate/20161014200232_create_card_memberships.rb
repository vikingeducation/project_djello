class CreateCardMemberships < ActiveRecord::Migration
  def change
    create_table :card_memberships do |t|
      t.integer :user_id, null: false
      t.integer :card_id, null: false

      t.timestamps null: false
    end

    add_index :card_memberships, :user_id
    add_index :card_memberships, :card_id
  end
end
