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

# User.create(  username: "foo",
#               email: "foo@1",
#               password: '12345678',
#               password_confirmation: '12345678'
#             )


1.times do

  User.create(  username: "foo",
                email: Faker::Internet.safe_email,
                password: '12345678',
                password_confirmation: '12345678'
              )

  User.create(  username: "foo2",
                email: Faker::Internet.safe_email,
                password: '12345678',
                password_confirmation: '12345678'
              )



end

Board.create(user_id: 1,
              title: "sample board")

List.create( board_id: Board.first.id,
              title: "Sample List",
              description: "Sample list description"
            )

List.create( board_id: Board.first.id,
              title: "Sample List 2",
              description: "Sample list description 2"
            )
Card.create( list_id: List.first.id,
              title: "My first Card",
              description: "my first card descript")

Membership.create( user_id: User.first.id,
                   card_id: Card.first.id )





