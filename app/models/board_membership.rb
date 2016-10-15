class BoardMembership < ApplicationRecord
  belongs_to :board
  belongs_to :member, foreign_key: :user_id, class_name: 'User'
end
