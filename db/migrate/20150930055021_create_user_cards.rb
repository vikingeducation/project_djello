class CreateUserCards < ActiveRecord::Migration
  def change
    create_table :user_cards do |t|
      t.integer :user_id, null: false
      t.integer :card_id, null: false
      
      t.timestamps null: false
    end

    add_index :user_cards, [:user_id, :card_id], :unique => true
  end
end
