class UserCard < ActiveRecord::Base
  belongs_to :member, :foreign_key => :user_id,
                      :class_name => "User"
  belongs_to :assigned_card, :foreign_key => :card_id,
                              :class_name => "Card"
end
