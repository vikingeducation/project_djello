# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Card.delete_all
CardMember.delete_all
List.delete_all
Board.delete_all
User.delete_all

MULTIPLIER = 2

puts 'Old records destroyed'

User.create(:email => 'test@test.com',
            :password => 'password',
            :password_confirmation => 'password')

puts 'Created Test User [:email => test@test.com, :password => password]'

(5 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :password => 'password',
              :password_confirmation => 'password')
end

puts 'Created faker users'

User.all.each do |user|
  rand(2 * MULTIPLIER).times do
    user.boards.create(:title => Faker::Lorem.sentence(2, true, 3))
  end
end

puts 'Boards created'

Board.all.each do |board|
  (rand(2 * MULTIPLIER) + 1).times do
    board.lists.create( :title => Faker::Lorem.sentence(2, true, 3),
                        :description => Faker::Lorem.sentence(3, true, 6))
  end
end

puts 'Lists created'

List.all.each do |list|
  (rand(2 * MULTIPLIER) + 1).times do
    c = list.cards.create(:title => Faker::Lorem.sentence(3, true, 5),
                          :description => Faker::Lorem.sentence(4, true, 7))
    c.members = User.all.sample(rand(3 * MULTIPLIER))
  end
end

puts 'Cards created'

puts 'SEEDING COMPLETE'