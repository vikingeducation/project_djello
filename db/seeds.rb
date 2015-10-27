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


User.create(:email => 'foobar@foo.com',
            :password => 'password',
            :password_confirmation => 'password')

5.times do
  User.create(:email => Faker::Internet.email,
              :password => 'password',
              :password_confirmation => 'password')
end


User.all.each do |user|
  rand(4).times do
    user.boards.create(:title => Faker::Lorem.sentence(2, true, 3))
  end
end


Board.all.each do |board|
  (rand(2) + 1).times do
    board.lists.create( :title => Faker::Lorem.sentence(2, true, 3),
                        :description => Faker::Lorem.sentence(3, true, 6))
  end
end


List.all.each do |list|
  (rand(4) + 2).times do
    c = list.cards.create(:title => Faker::Lorem.sentence(3, true, 5),
                          :description => Faker::Lorem.sentence(3, true, 7))
    c.members = User.all.sample(rand(3))
  end
end