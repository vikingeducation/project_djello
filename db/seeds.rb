puts "purging database"
User.destroy_all
Board.destroy_all

puts "creating new users + boards"
5.times do
  User.create(username: Faker::Superhero.name, email: Faker::Internet.email, password: 'password')
end

5.times do
  b = Board.create(title: Faker::Hipster.word)

  2.times do
    l = b.lists.create!(title: Faker::Company.buzzword, description: Faker::Commerce.product_name)
    3.times do
      c = l.cards.create!(title: Faker::Book.title, description: Faker::Company.bs)
      c.users.push(User.all.sample)
    end
  end

end
