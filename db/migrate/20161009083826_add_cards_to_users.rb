class AddCardsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :card, index: true
  end
end
