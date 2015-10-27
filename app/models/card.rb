class Card < ActiveRecord::Base
  belongs_to :list

  has_many :card_members
  has_many :members, :through => :card_members, :class_name => 'User'

  validates :title, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false

  after_create :log_card_created
  after_update :log_card_updated
  # after_update, save card_activity with modification...
  # ...(title: 'New title')
  # ...(description: 'New description')
  # ...(completed: true)


  protected

    def log_card_created
    end

    def log_card_updated
    end

end
