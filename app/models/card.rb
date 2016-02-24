class Card < ActiveRecord::Base

  belongs_to :list

  has_many :card_members
  has_many :members, :through => :card_members, :class_name => 'User'

  has_many :card_activities

  validates :title, presence: true, allow_blank: false
  validates :description, presence: true, allow_blank: false
  
  after_create :log_card_created
  after_update :log_card_updated

  protected

  def log_card_created
    user = self.list.board.owner
    self.card_activities.create(user_id: user.id, action: 'card created')
  end

  def log_card_updated
    user = self.list.board.owner
    
    if self.title_changed?
      action = 'title updated'
    elsif self.description_changed?
      action = 'description updated'
    elsif self.completed_changed?
      action = "completed updated to #{self.completed}"
    end

    self.card_activities.create(user_id: user.id, action: action)
  end
  
end
