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
  board
end

def generate_list(board)
  list = List.new
  list.board_id = board.id
  list.title = Faker::Book.title
  list.description = Faker::Lorem.sentence
  list.save
  list
end

def generate_card(list)
  card = Card.new
  card.list_id = list.id
  card.title = Faker::Book.title
  card.description = Faker::Lorem.sentence
  card.completed = false
  card.save
  user = User.offset(rand(User.count)).first
  card_member = CardMember.new
  card_member.user_id = user.id
  card_member.card_id = card.id
  card_member.save
  activity = Activity.new
  activity.card_id = card.id
  activity.user_id = user.id
  activity.desc = "#{user.username} created #{card.title}"
  activity.save
  card
end

def generate_membership
  card_member = CardMember.new
  card_member.user_id = User.offset(rand(User.count)).first.id
  card_member.card_id = Card.offset(rand(Card.count)).first.id
  card_member.save
  card_member
end

def generate_activity
  Card.all.each do |c|
    activity = Activity.new
    user = User.offset(rand(User.count)).first
    activity.user_id = user.id
    activity.card_id = c.id
    activity.desc = "#{user.username} created #{c.title}"
    activity.save
  end
end

u = User.create(email: "test@test.com", username: "test", password: "password", password_confirmation: "password")

5.times do
  b = generate_board(u)
  5.times do
    l = generate_list(b)
    5.times do
      c = generate_card(l)
    end
  end
end

MULTIPLIER.times do
  user = generate_user
end
(MULTIPLIER / 5).times do
  board = generate_board(User.offset(rand(User.count)).first)
end
(MULTIPLIER / 5).times do
  list = generate_list(Board.offset(rand(Board.count)).first)
end
(MULTIPLIER / 5).times do
  card = generate_card(List.offset(rand(List.count)).first)
end
