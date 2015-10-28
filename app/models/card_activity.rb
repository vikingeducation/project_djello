class CardActivity < ActiveRecord::Base
  belongs_to :card
  belongs_to :user


  def message
    self.user.username + self.action
  end

end
