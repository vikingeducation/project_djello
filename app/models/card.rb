class Card < ApplicationRecord
  belongs_to :user
  belongs_to :board
  belongs_to :list
end
