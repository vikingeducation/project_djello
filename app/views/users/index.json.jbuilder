json.array!(@users) do |user|
  json.extract! user, :id, :username, :email, :created_at, :updated_at
  json.boards user.boards
  json.cards user.cards
end
