class AddIndexToJoinTables < ActiveRecord::Migration[5.0]
  def change
    add_index :board_memberships, [:board_id, :user_id], :unique => true
    add_index :card_memberships, [:card_id, :user_id], :unique => true
  end
end
