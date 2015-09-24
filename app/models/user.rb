class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :boards, dependent: :destroy

  has_many :memberships
  has_many :cards, through: :memberships, source: 'card'

  def owned_card_ids
    query = <<-SQL
    SELECT cards.id
      FROM users
      INNER JOIN boards on boards.user_id = ?
      INNER JOIN lists on lists.board_id = boards.id
      INNER JOIN cards_lists on cards_lists.list_id = lists.id
      INNER JOIN cards on cards.id = cards_lists.card_id
    SQL
    (Card.find_by_sql [query, self.id]).map {|el| el.id }
  end

  def email_required?
   false
  end

  def email_changed?
   false
  end
end
