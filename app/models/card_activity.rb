class CardActivity < ActiveRecord::Base
  belongs_to :card
  belongs_to :user


  def message
    
  end

end
