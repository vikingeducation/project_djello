class Card < ApplicationRecord
  # Public activity gem. Track activity involving Card model.
  include PublicActivity::Model
  tracked owner: -> (controller,model) { controller && controller.current_user }
  tracked params: {
    title: proc { |controller, model| model.title },
    body: proc { |controller, model| model.body },
    completed: proc { |controller, model| "as completed" if model.completed },
    list: proc { |controller, model| model.list.title if model.list },
    board: proc { |controller, model| model.list.board.title if model.list }
  }

  belongs_to :author, foreign_key: 'user_id', class_name: 'User'
  belongs_to :list

  # Card memberships
  has_many :card_memberships
  has_many :members, through: :card_memberships, source: :member

end
