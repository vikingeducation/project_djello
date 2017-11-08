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
    Card.create!(list: l, title: Faker::Book.title, description: Faker::Hacker.say_something_smart)
  end
end

puts 'Assigning card memberships...'
Card.all.each do |c|
  c.member_ids = c.board.board_member_ids.sample(rand(3))
end

puts 'Done!'
