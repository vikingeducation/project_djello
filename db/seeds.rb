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
