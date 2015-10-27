class CardMember < ActiveRecord::Base
  belongs_to :card
  belongs_to :member, :class_name => 'User'

  after_create :log_member_added
  after_destroy :log_member_removed


  protected

    def log_member_added
      user = self.member
      self.card.card_activities.create(user_id: user.id, action: 'member added')
    end

    def log_member_removed
      user = self.log_member_removed
      self.card.card_activities.create(user_id: user.id, action: 'member removed')
    end

end
