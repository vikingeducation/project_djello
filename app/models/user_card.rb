class UserCard < ActiveRecord::Base
  belongs_to :member, 
              foreign_key: :user_id, 
              class_name: "User"

  belongs_to :assigned_card, 
              foreign_key: :card_id,
              class_name: "Card"

  before_create :create_user_board

  validates :user_id, :card_id, :role, presence: true
  validates :role, inclusion: { in: %w(creater participator) }

  def board
    assigned_card.board
  end

  def create_user_board
    unless board.members.include?(member)
      UserBoard.create(user_id: member.id, board_id: board.id, role: 'participator')
    end
  end

end
