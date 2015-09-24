class User < ActiveRecord::Base
  has_many :boards

  has_many :card_memberships, class_name: 'CardMember',
                              foreign_key: 'user_id'
  has_many :cards, through: :card_memberships

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
