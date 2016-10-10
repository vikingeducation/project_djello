class User < ApplicationRecord
  has_many :boards

  # Membership in a board.
  has_many :board_memberships
  has_many :boards_through_membership,
            through: :board_memberships,
            class_name: 'Board',
            foreign_key: :user_id,
            source: :board

  belongs_to :card, optional: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_accessor :login

  # Code to allow login by username
  validates :username,
    :presence => true,
    :uniqueness => {
      :case_sensitive => false
    }

  # Only allow letter, number, underscore and punctuation.
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  def self.find_for_database_authentication(warden_conditions)
   conditions = warden_conditions.dup
   if login = conditions.delete(:login)
     where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
   elsif conditions.has_key?(:username) || conditions.has_key?(:email)
     where(conditions.to_hash).first
   end
  end

  # Returns the union between boards authored and boards to which he belongs
  # as a member.
  def boards_authored_and_member
   boards.union(boards_through_membership)
  end

  def cards_authored_and_member
  end
end
