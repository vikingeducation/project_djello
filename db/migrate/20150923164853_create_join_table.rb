class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :cards, :lists do |t|
      # t.index [:card_id, :list_id]
      # t.index [:list_id, :card_id]
    end
  end
end
