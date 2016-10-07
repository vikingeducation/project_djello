Board.destroy_all
List.destroy_all

MULTIPLIER = 3

user = User.find_by_email("matthew.hinea@gmail.com")

MULTIPLIER.times do |board_idx|
  board = user.boards.create(title: "Board no. #{board_idx}", description: Faker::Lorem.sentence(1))
  MULTIPLIER.times do |list_idx|
    board.lists.create(title: "List no #{list_idx} of board no. #{board_idx}", description: Faker::Hacker.say_something_smart)
  end
end