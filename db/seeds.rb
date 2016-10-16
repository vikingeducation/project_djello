Board.destroy_all
List.destroy_all
Card.destroy_all
Team.destroy_all
User.destroy_all

MULTIPLIER = 3

user = User.create(email: "matthew.hinea@gmail.com", password: "password")

MULTIPLIER.times do |i|
  team = Team.create(name: Faker::Team.name)
  teammate = User.create(email: Faker::Internet.email)
  team.users = [user, teammate]
end

MULTIPLIER.times do |board_idx|
  board = user.boards.create(title: Faker::App.name, description: Faker::Lorem.sentence(1))
  team = Team.all.sample
  board.team = team
  board.save
  MULTIPLIER.times do |list_idx|
    list = board.lists.create(title: "List no #{list_idx} of board no. #{board_idx}", description: Faker::Hacker.say_something_smart)
    MULTIPLIER.times do |card_idx|
      card = Card.create(title: Faker::Hacker.abbreviation, text: Faker::Hacker.say_something_smart)
      assigned_user = team.users.sample
      card.users << [assigned_user]
      list.cards << card
    end
  end
end

userless_team = Team.create(name: "team where I'm not a member")
userless_team.users = [User.create(email: Faker::Internet.email)]