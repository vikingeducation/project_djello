class AddUsersToLists < ActiveRecord::Migration[5.0]
  def change
    add_reference :lists, :user, index: true
  end
end
