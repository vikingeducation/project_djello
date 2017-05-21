puts "clearing..."
Activity.delete_all
BoardMembership.delete_all
Board.delete_all
CardMembership.delete_all
Card.delete_all
List.delete_all
User.delete_all
puts "DONE"

MULTIPLIER = 30

puts "creating users..."
MULTIPLIER.times do |i|
  User.create(
    username: "foo#{i}",
    email: "foo#{i}@bar.com",
    password: "something"
    )
end
puts "DONE"
