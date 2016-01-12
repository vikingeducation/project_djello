Board.destroy_all
4.times do
	b = Board.new
	b.name = Faker::Book.title
	b.user_id = User.last.id
	b.save!
end