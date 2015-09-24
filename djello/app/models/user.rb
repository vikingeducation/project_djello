class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :database_authenticatable, :authentication_keys => [:username]

  has_many :boards
  has_many :lists, through: :boards
  has_many :cards, through: :lists

  #===== read only access associations below====
  has_many :collaborations, class_name: "CardMembership"
  has_many :tasks, through: :collaborations
  has_many :task_lists, through: :tasks, source: :list
  has_many :projects, through: :task_lists, source: :board


end
