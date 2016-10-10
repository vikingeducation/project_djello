class Board < ActiveRecord::Base
  belongs_to :user
  has_many :lists, dependent: :destroy
  belongs_to :team
end
