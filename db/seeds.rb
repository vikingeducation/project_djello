# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



3.times do |i|
  user = User.create(email: "#{i}@email.com",
                     password: "12345678")

  board = user.boards.create(name: "board#{i}")

  list = board.lists.create(name: "list#{i}")

    5.times do |card|
      list.cards.create(name: "CARD #{card}",
                       content: "Lorem Ipsum")
    end

end