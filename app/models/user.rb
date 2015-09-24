class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :boards, dependent: :destroy

  has_many :memberships
  has_many :cards, through: :memberships, source: 'card'
  def email_required?
   false
  end

  def email_changed?
   false
  end
end
