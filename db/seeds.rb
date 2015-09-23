# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Board.destroy_all
Card.destroy_all

base_user = User.create(username: 'd', password: "dddddddd", password_confirmation: "dddddddd")

5.times do
  new_board = base_user.boards.create(name: Faker::Commerce.product_name)
  2.times do
    new_list = new_board.lists.create(title: "seeded list", description: "desc")
    2.times do
      new_list.cards.create(title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph)
    end
  end
end

5.times do |i|
  new_user = User.create(username: Faker::Name.name, password: "dddddddd", password_confirmation: "dddddddd")
  5.times do
    new_board = new_user.boards.create(name: Faker::Commerce.product_name)
    2.times do
      new_list = new_board.lists.create(title: "seeded list", description: "desc")
      2.times do
        new_list.cards.create(title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph)
      end
    end
  end
end
