# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Card.destroy_all
List.destroy_all
User.destroy_all
Board.destroy_all

puts 'Creating users...'

5.times do |n|
  User.create!(first_name: "Foo#{n}", last_name: "Bar#{n}", email: "foo#{n+1}@bar.com", password: 'foobarfoobar')
end

puts 'Creating boards...'
User.all.each do |u|
  rand(7..12).times do
    Board.create!(title: Faker::Book.title, owner: u)
  end
end

puts 'Creating Lists & Board Members...'
Board.all.each do |b|
  rand(2..5).times do
    List.create!(board: b, title: Faker::Book.title, description: Faker::Hacker.say_something_smart)
    b.board_member_ids = User.all.sample(rand(1..4)).pluck(:id)
  end

end

puts 'Creating Cards...'
List.all.each do |l|
  rand(5).times do
    card = Card.create!(list: l, title: Faker::Book.title, description: Faker::Hacker.say_something_smart)
    card_creator = User.find(card.board.board_member_ids.sample(1).first)
    card_creator.track_card_creation(card)
  end
end

puts 'Assigning card memberships...'
Card.all.each do |c|
  board_members = c.board.board_member_ids.sample(rand(1..3))
  c.member_ids = board_members
  board_members.each do |m|
    User.find(board_members.sample(1).first).track_add_card_member(c, User.find(m))
  end
end


puts 'Done!'
