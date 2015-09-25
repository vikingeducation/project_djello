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
Membership.destroy_all

#create
3.times do

  user = User.create(
    username: Faker::Internet.user_name.capitalize,
    email:    Faker::Internet.email,
    password: 'foobar_1234',
    password_confirmation: 'foobar_1234')
  3.times do |i|

    board = user.boards.create(title: Faker::Book.title,
                                user_id: user.id )

    2.times do 
      list = board.lists.create(title: Faker::Book.title ,
                        description:  Faker::Lorem.sentence )

      4.times do 
        card = list.cards.create(title: Faker::Book.title,
                          description: Faker::Lorem.sentence )
        card.memberships.create(user_id: user.id,
                            card_id: card.id)

      end

    end

  end

end

