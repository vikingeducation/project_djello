Board.destroy_all
4.times do
	b = Board.new
	b.name = Faker::Book.title
	b.user_id = User.last.id
	b.save!
end

board_ids = Board.all.pluck(:id)

List.destroy_all
10.times do
	l = List.new
	l.board_id = board_ids.sample
	l.title = Faker::Book.title
	l.description = Faker::Lorem.paragraph
	l.save!
end

list_ids = List.all.pluck(:id)

Card.destroy_all
20.times do
	c = Card.new
	c.list_id = list_ids.sample
	c.content = Faker::Lorem.paragraph
	c.save!
end