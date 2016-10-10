# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "Destroying boards.."
Board.destroy_all
puts "Done!"

puts "Destroying users.."
User.destroy_all
puts "Done!"

puts "Destroying lists.."
List.destroy_all
puts "Done"

puts "Destroying Cards.."
Card.destroy_all
puts "Done"

puts "Creating main user.."
User.create!({
  username: 'foobar',
  email: 'foobar@barbaz.com',
  password: 'foobar'
  })
puts "Done!"

puts "Creating users.."
10.times do |n|
  User.create!({
    username: Faker::Internet.user_name + "#{n}",
    email: Faker::Internet.email,
    password: '1234567891011'
  })
end
puts "Done!"

puts "Creating authored boards.."
10.times do |n|
  user = User.all.sample
  user.boards.create!({
      title: Faker::App.name,
      description: Faker::Lorem.paragraph(1)
    })
end
puts "Done!"

puts "Creating lists..."
10.times do |n|
  board = Board.all.sample
  user = User.all.sample
  board.lists.create!({
    author: user,
    title: Faker::App.name,
    description: Faker::Lorem.paragraph(1)
  })
end
puts "Done!"

puts "Creating cards..."
10.times do |n|
  # list = List.all.sample
  List.all.each do |list|
    list.cards.create!({
      title: Faker::App.name,
      body: Faker::Lorem.paragraph(1),
      completed: [true,false].sample
    })
  end
end
puts "Done!"

puts "Creating board memberships.."
30.times do |n|
  board = Board.all.sample
  member = User.all.sample
  board.members << member
end
puts "Done!"
