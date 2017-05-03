puts "clearing..."
User.delete_all
Board.delete_all
puts "DONE"

puts "creating users..."
counter = 20
while (counter > 0) do
  User.create(
    username: "foo#{counter}",
    email: "foo#{counter}@bar.com",
    password: "something"
    )
  counter -= 1
end
puts "DONE"

puts "creating boards and lists..."
User.all.each do |user|
  3.times do 
    user.boards.create(
      title: Faker::Company.name,
      description: Faker::Hipster.paragraph
      )
  end

  user.boards.each do |board|
    5.times do 
      user.lists.create(
        title: Faker::Hipster.word,
        description: Faker::Hipster.paragraph,
        board_id: board.id
      )
    end
  end
end

List.all.each do |list|
  2.times do
    list.cards.create(
      
      )
  end
end
puts "DONE"
