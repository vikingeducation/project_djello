# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Board.destroy_all


titles = ["Todo", "Foo Project", "Baz Project"]
descriptions = ["This is our todo list project management board", "Project management for Foo project", "Manage all tasks for Baz project"]

puts "creating boards"
(0..2).each do |i|

  b = Board.new(title: titles[i], description: descriptions[i], user_id: 1)
  b.save!

end