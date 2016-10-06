# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Board.destroy_all

MULTIPLIER = 3

user = User.find_by_email("matthew.hinea@gmail.com")

MULTIPLIER.times do |idx|
  user.boards.create(title: "Board no. #{idx}", description: Faker::Lorem.sentence(2))
end