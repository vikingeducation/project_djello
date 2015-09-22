# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Board.destroy_all

MULTIPLIER = 20

def generate_user
  user = User.new
  user.username = Faker::Internet.user_name
  user.email = Faker::Internet.email
  user.password = "password"
  user.password_confirmation = "password"
  user.save
  user
end

def generate_board(user)
  board = Board.new
  board.user_id = user.id
  board.title = Faker::Book.title
  board.description = Faker::Lorem.sentence
  board.save
end

u = User.create(email: "test@test.com", username: "test", password: "password", password_confirmation: "password")

5.times do
  generate_board(u)
end

MULTIPLIER.times do
  user = generate_user
  (MULTIPLIER / 5).times do
    generate_board(user)
  end
end
