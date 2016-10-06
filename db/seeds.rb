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

puts "Creating users.."
10.times do |n|
  User.create!({
    username: Faker::Internet.user_name,
    email: Faker::Internet.safe_email,
    password: '1234567891011'
  })
end
puts "Done!"

user_ids = (1..10).to_a

puts "Creating boards.."
10.times do |n|
  user = User.all.sample
  user.boards.create!({
      title: Faker::App.name,
      description: Faker::Lorem.paragraph(1)
    })
end
puts "Done!"
