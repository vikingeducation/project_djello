class AddUserReferenceToCards < ActiveRecord::Migration[5.0]
  def change
    add_reference :cards, :user, index: true
  end
end
