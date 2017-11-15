class Card < ApplicationRecord
  belongs_to :list
  has_one :board, through: :list
  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships, source: :user
  has_one :owner, through: :board
  has_many :activities,  -> {order('created_at DESC')}, dependent: :destroy

  after_create :set_position

  validates :title, presence: true, if: :should_validate?

  private

  def should_validate?
    !! self.title
  end

  def set_position
    self.reload
    self.update(position: self.list.cards.length - 1) if self.list.cards.length > 0
    self.update(position: 0) unless self.position
  end
end
