User.destroy_all
Board.destroy_all
List.destroy_all
Card.destroy_all
Member.destroy_all

MULTIPLIER = 5

puts "creating users..."
MULTIPLIER.times do
  User.create(username: Faker::Name.name, email: Faker::Internet.email,
              password: "password", password_confirmation: "password");
end

puts "creating boards..."
MULTIPLIER.times do
  Board.create(title: Faker::Hipster.sentence(3, true), user_id: User.pluck(:id).sample);
end

puts "creating lists..."
(5 * MULTIPLIER).times do
  List.create(title: Faker::Hipster.sentence(3, true), board_id: Board.pluck(:id).sample);
end

puts "creating cards..."
(10 * MULTIPLIER).times do
  card = Card.create(title: Faker::Hipster.sentence(3, true), desc: Faker::Hipster.paragraph,
                     list_id: List.pluck(:id).sample);
  card.card_member_ids = User.pluck(:id)
end

