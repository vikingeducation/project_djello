class Card < ActiveRecord::Base
  belongs_to :list

  validates :title, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
end
