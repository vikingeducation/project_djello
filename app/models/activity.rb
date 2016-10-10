class Activity < ApplicationRecord
  belongs_to :user
  belongs_to :card
  belongs_to :list
  belongs_to :board
end
