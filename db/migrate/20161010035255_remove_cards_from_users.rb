class RemoveCardsFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_reference :users, :card
  end
end
