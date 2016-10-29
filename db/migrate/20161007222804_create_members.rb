class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :user
      t.references :card
      t.timestamps
    end
    add_index :members, [:user_id, :card_id], unique: true
  end
end
