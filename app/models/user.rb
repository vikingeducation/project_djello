class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :boards
  has_many :user_boards, foreign_key: :user_id
  has_many :assigned_boards, through: :user_boards, source: :assigned_board
end
