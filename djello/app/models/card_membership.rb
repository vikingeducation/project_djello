class CardMembership < ActiveRecord::Base

  belongs_to :task, class_name: "Card", foreign_key: :card_id
  belongs_to :user

end
