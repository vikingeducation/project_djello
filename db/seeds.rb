# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all
Membership.destroy_all

u = User.new(
  email: 'alex@alex.com',
  password: 'password',
  username: 'alexlach'
  )
u.save


10.times do 

  p = User.new(
    email: Faker::Internet.email,
    password: 'password',
    username: Faker::GameOfThrones.character
    )
  p.save

end
