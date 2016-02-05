# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Card.delete_all
CardMember.delete_all
CardActivity.delete_all
List.delete_all
Board.delete_all
User.delete_all

MULTIPLIER = 3

puts 'Old records destroyed'

User.create(:email => 'test@test.com',
            :password => 'password',
            :password_confirmation => 'password',
            :username => 'tester')

puts 'Created Test User [:email => test@test.com, :password => password]'

(5 * MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :password => 'password',
              :password_confirmation => 'password',
              :username => Faker::Internet.user_name,
              :created_at => rand(20160).minutes.ago)
end

puts 'Created faker users'

User.all.each do |user|
  rand(4).times do
    user.boards.create(:title => Faker::Lorem.sentence(2, true, 3).chomp('.'),
                       :created_at => rand(Time.now - user.created_at).seconds.ago)
  end
end

puts 'Boards created'

Board.all.each do |board|
  (rand(2) + 1).times do
    board.lists.create( :title => Faker::Lorem.sentence(2, true, 3).chomp('.'),
                        :description => Faker::Lorem.sentence(3, true, 6),
                        :created_at => rand(Time.now - board.created_at).seconds.ago)
  end
end

puts 'Lists created'

List.all.each do |list|
  (rand(3) + 1).times do
    c = list.cards.create(:title => Faker::Lorem.sentence(3, true, 5).chomp('.'),
                          :description => Faker::Lorem.sentence(4, true, 7),
                          :created_at => rand(Time.now - list.created_at).seconds.ago)

    c.members = User.all.sample(rand(1 * MULTIPLIER))
  end
end

puts 'Cards created'

Card.all.each do |card|
  (rand(2) + 1).times do
    u = User.all.sample
    action_time = rand(Time.now - [u.created_at, card.created_at].max).seconds.ago

    card.card_members.create( :member_id => u.id,
                              :created_at => action_time)
    activity = card.card_activities.last
    activity.created_at = action_time
    activity.save!
  end
end

puts 'Activities created'

puts 'SEEDING COMPLETE'