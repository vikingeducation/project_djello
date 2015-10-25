class CardMember < ActiveRecord::Base
  belongs_to :card
  belongs_to :member, :class_name => 'User'
end
