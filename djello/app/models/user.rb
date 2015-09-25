class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :database_authenticatable, :authentication_keys => [:username]

  has_many :boards
  has_many :memberships
end
