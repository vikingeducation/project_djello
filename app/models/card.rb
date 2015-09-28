class Card < ActiveRecord::Base

  belongs_to :list
  has_many :card_members
  has_many :members,  through: :card_members,
                      foreign_key: :user_id

end
