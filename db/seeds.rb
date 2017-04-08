# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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

puts "creating boards..."
User.all.each do |user|
  3.times do 
    user.boards.create(
      title: Faker::Company.name
      )
  end
end
puts "DONE"
