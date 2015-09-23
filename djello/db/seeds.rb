# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all
Board.destroy_all

#create
10.times do

  user = User.create(username: Faker::Internet.user_name,
    email:    Faker::Internet.email,
    password: 'foobar_1234',
    password_confirmation: 'foobar_1234')
  3.times do |i|

    board = user.boards.create(title: "Board Title #{i}",
                                user_id: User.first.id )

    2.times do |i|
      list = board.lists.create(title: Faker::Lorem.sentence,
                        description:  "some description here" )

      4.times do |i|
        list.cards.create(title: Faker::Lorem.sentence,
                          description: Faker::Lorem.sentence )
      end

    end

  end

end

