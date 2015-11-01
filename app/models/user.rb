class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # :recoverable,
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable

  has_many :boards, :foreign_key => 'owner_id', :dependent => :nullify
  has_many :lists, :through => :boards
  has_many :cards, :through => :lists

  has_many :card_members, :foreign_key => :member_id
  has_many :assigned_cards, :through => :card_members, :source => :card
  has_many :assigned_lists, :through => :assigned_cards, :source => :list
  has_many :assigned_boards, :through => :assigned_lists, :source => :board


  def all_active_boards
    self.boards.all.concat(self.assigned_boards).uniq
  end

end
