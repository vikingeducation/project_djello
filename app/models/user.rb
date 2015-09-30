class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :boards,
            dependent: :destroy

  has_many :user_cards, foreign_key: :user_id,
            dependent: :destroy
  has_many :assigned_cards, through: :user_cards, source: :assigned_card

  has_many :assigned_lists, through: :assigned_cards, source: :list

  has_many :assigned_boards, through: :assigned_lists, source: :board
end
