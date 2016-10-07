# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "purging database"
User.destroy_all
Board.destroy_all

puts "creating new users + boards"
User.create(username: Faker::Superhero.name, email: Faker::Internet.email, password: 'password')

5.times do
  b = Board.create(title: Faker::Hipster.word)

  2.times do
    l = b.lists.create!(title: Faker::Company.buzzword, description: Faker::Commerce.product_name)
    3.times do
      l.cards.create!(title: Faker::Book.title, description: Faker::Company.bs)
    end
  end

end
