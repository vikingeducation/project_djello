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
	u = User.last
	l = List.find(list_ids.sample)
	c = Card.new
	c.list_id = l.id
	c.content = Faker::Lorem.paragraph
	c.activity = ["#{u.username} added this card to the #{l.title} list on <span class=\"card-date\">#{Time.now.strftime("%b %d, %Y")}</span>"].to_json
	c.save!
end