class Membership < ActiveRecord::Base

 
  belongs_to :user
  #delegate :username, to: :user
  
  belongs_to :card

  validates :user_id, uniqueness: {scope: :card_id}
  validates :user, presence: true
  validates :card, presence: true
end
