class CardMember < ActiveRecord::Base

  belongs_to :card
  belongs_to :member, foreign_key: :user_id,
                      class_name: 'User'

  # ----------------------- Validations --------------------

  validates :user_id, :card_id,
            presence: true

end
