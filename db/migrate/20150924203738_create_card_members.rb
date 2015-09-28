class CreateCardMembers < ActiveRecord::Migration
  def change
    create_table :card_members do |t|
      t.integer :user_id, null: false
      t.integer :card_id, null: false


      t.timestamps null: false
    end

    add_column :cards, :position, :integer, null: false, default: 0
    add_column :lists, :position, :integer, null: false, default: 0
  end
end
