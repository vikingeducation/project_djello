# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all
CardMember.destroy_all

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
  card
end

def generate_card_memberships(user)
  member = CardMember.new
  new_id = User.ids.sample
  loop do
    break if new_id != user.id
    new_id = User.ids.sample
  end
  member.user_id = new_id
  member.card_id = Card.ids.sample
  member.save
  member
end

u = User.create(email: "test@test.com", username: "test", password: "password", password_confirmation: "password")

MULTIPLIER.times do
  user = generate_user
  (MULTIPLIER / 5).times do
    board = generate_board(user)
    (MULTIPLIER / 5).times do
      list = generate_list(board)
      (MULTIPLIER / 5).times do
        generate_card(list)
      end
    end
  end
end

5.times do
  b = generate_board(u)
  5.times do
    l = generate_list(b)
    5.times do
      c = generate_card(l)
      5.times do
        CardMember.create(user_id: User.ids.sample, card_id: c)
      end
    end
  end
end

(MULTIPLIER * 200).times do
  generate_card_memberships(u)
end
