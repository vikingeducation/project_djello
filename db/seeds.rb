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
Activity.destroy_all
UserBoard.destroy_all
UserCard.destroy_all


3.times do |i|
  user = User.create(email: "#{i}@email.com",
                     password: "11111111")
end


5.times do |i|
  uid = 1+rand(3)
  board = Board.create(name: "board#{i}")
  UserBoard.create(user_id: uid, board_id: i+1, role: 'creater')

  list = board.lists.create(name: "list#{i}")

    3.times do |num|
      card = list.cards.create(name: "CARD #{3*i+num+1}",
                               content: "Lorem Ipsum")
      card.activities.create(content: "activity #{3*i+num+1}")
      UserCard.create(user_id: uid, card_id: 3*i+num+1, role: 'creater')
    end

end

