class CreateCardMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :card_memberships do |t|
      t.belongs_to :card, index: true
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
