class AddUsersToBoards < ActiveRecord::Migration[5.0]
  def change
    add_reference :boards, :user, index: true
  end
end
