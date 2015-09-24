class Membership < ActiveRecord::Base
  validates_uniqueness_of :user_id, scope: :card_id
  belongs_to :user
  belongs_to :card
end
