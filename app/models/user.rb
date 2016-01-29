class User < ActiveRecord::Base
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :rememberable, :trackable, :validatable

  has_many :boards, :foreign_key => 'owner_id', :dependent => :nullify
  has_many :lists, :through => :boards
  has_many :cards, :through => :lists

end
