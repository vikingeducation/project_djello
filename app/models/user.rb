class User < ActiveRecord::Base
	has_secure_password

	has_many :boards
	has_many :lists
	has_many :cards
	
end
