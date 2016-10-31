class Card < ApplicationRecord
  belongs_to :user
  belongs_to :board
  belongs_to :list
  has_many :activities, dependent: :destroy
  has_many :memberships, dependent: :destroy
  has_many :members, :through => :memberships, :class_name => "User", :source => :user

  def self.create_membership_activity(card_id, add_remove, to_from, user_id, member_id)
    card = Card.find(card_id)
    username = User.find(user_id).username
    member = User.find(member_id).username
    card.activities.create({
      card_id: card_id,
      user_id: user_id,
      action: "#{username} #{add_remove} #{member} #{to_from} card",
      list_id: card.list_id,
      board_id: card.board_id
      })
  end

end
