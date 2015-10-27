class CardMember < ActiveRecord::Base
  belongs_to :card
  belongs_to :member, :class_name => 'User'

  after_create :log_member_added
  after_destroy :log_member_removed


  protected

    def log_member_added
    end

    def log_member_removed
    end

end
