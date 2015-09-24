class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

         #
  has_many :boards

          # Be
  has_many :card_members
  has_many :member_cards, through: :card_members,
                          source: :card

  has_many :member_lists, through: :member_cards,
                          source: :list
  has_many :member_boards, through: :member_lists,
                           source: :board


  def owned_and_member_boards
    Board.where(user_id: self.id) + self.member_boards
  end
end
