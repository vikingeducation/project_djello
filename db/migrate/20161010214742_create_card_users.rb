class CreateCardUsers < ActiveRecord::Migration
  def change
    create_table :card_users do |t|
      t.integer :card_id
      t.integer :user_id
      t.timestamps null: false
    end
    add_index :card_users, [:card_id, :user_id], unique: true
  end
end
