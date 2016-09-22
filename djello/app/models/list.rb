class List < ActiveRecord::Base

  has_many :cards
  belongs_to :board
  delegate :owner, to: :board

  default_scope { includes(:cards)}
end
