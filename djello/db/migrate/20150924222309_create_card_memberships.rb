class CreateCardMemberships < ActiveRecord::Migration
  def change
    create_table :card_memberships do |t|
      t.references :user
      t.references :card
      t.timestamps null: false
    end
  end
end
