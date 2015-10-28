class CardActivity < ActiveRecord::Base
  belongs_to :card
  belongs_to :user


  def message
    actor = user
    if action.include?('member')
      actor = card.list.board.owner
    end
    "#{actor.username} " + write_action
  end


  private

    def write_action
      case self.action
      when "card created"
        "added this card to the \"#{self.card.list.board.title}\" board"
      when "title updated"
        "changed the title of this card to \"#{self.card.title}\""
      when "description updated"
        "changed the description of this card to \"#{self.card.description}\""
      when "completed updated to true"
        "marked this card Completed"
      when "completed updated to false"
        "marked this card as incomplete"
      when "member added"
        "added #{self.user.username} as a member of this card"
      when "member removed"
        "removed #{self.user.username} as a member of this card"
      end
    end


end
