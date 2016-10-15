class CreateBoardMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :board_memberships do |t|
      t.belongs_to :board, index: true
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
