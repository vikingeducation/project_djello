class Card < ActiveRecord::Base
  belongs_to :list
  has_many :card_memberships

  has_many :members, through: :card_memberships, 
                     class_name: "User", 
                     source: :user
end
