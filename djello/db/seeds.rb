# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all
CardMembership.destroy_all

#create
2.times do

  user = User.create(username: Faker::Internet.user_name,
    email:    Faker::Internet.email,
    password: 'foobar_1234',
    password_confirmation: 'foobar_1234')
  3.times do |i|
    board = user.boards.create(title: "Board Title #{i}")

    2.times do
      list = board.lists.create(title: Faker::Commerce.department,
        description:  Faker::Lorem.sentence)

      4.times do
        list.cards.create(title: Faker::SlackEmoji.activity,
          description: Faker::Lorem.sentence )
      end
    end
  end
end

testuser = User.create(username: 'tester',
  email:    Faker::Internet.email,
  password: 'password',
  password_confirmation: 'password')

3.times do |i|
  board = testuser.boards.create(title: "Random Board Title #{i}")
  2.times do
    list = board.lists.create(title: Faker::Commerce.department,
      description:  Faker::Lorem.sentence )
    4.times do
      list.cards.create(title: Faker::SlackEmoji.activity,
        description: Faker::Lorem.sentence )
    end
  end
end

users = User.all
cards = Card.all

25.times do

  CardMembership.create(user_id: users.sample.id,
                        card_id: cards.sample.id)
end

