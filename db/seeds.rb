# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

SEED_MULTIPLIER = 3


CardMember.delete_all
CardActivity.delete_all
Card.delete_all
List.delete_all
Board.delete_all
User.delete_all


User.create(:email => 'foobar@foo.com',
            :password => 'password',
            :password_confirmation => 'password',
            :username => 'foobar',
            :created_at => 30.days.ago)

(5 * SEED_MULTIPLIER).times do
  User.create(:email => Faker::Internet.email,
              :password => 'password',
              :password_confirmation => 'password',
              :username => Faker::Internet.user_name,
              :created_at => rand(30).days.ago)
end


# guarantees that foobar has at least 1 board
User.first.boards.create( :title => Faker::Lorem.sentence(2, true, 3).chomp('.'),
                          :created_at => rand(Time.now - User.first.created_at).seconds.ago)


User.all.each do |user|
  rand(4).times do
    user.boards.create( :title => Faker::Lorem.sentence(2, true, 3).chomp('.'),
                        :created_at => rand(Time.now - user.created_at).seconds.ago)
  end
end


Board.all.each do |board|
  (rand(2) + 1).times do
    board.lists.create( :title => Faker::Lorem.sentence(2, true, 3).chomp('.'),
                        :description => Faker::Lorem.sentence(3, true, 6),
                        :created_at => rand(Time.now - board.created_at).seconds.ago)
  end
end


List.all.each do |list|
  (rand(4) + 2).times do
    list.cards.create(:title => Faker::Lorem.sentence(3, true, 5).chomp('.'),
                      :description => Faker::Lorem.sentence(3, true, 7),
                      :created_at => rand(Time.now - list.created_at).seconds.ago)
  end
end


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
