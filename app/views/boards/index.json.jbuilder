# render json: @boards.to_json( include: [:user, lists: { include: [cards:{ include: :list }] } ] )

json.array!(@boards) do |board|
  json.extract! board, :id, :user_id, :title, :description, :created_at, :updated_at
  json.user board.user
  json.lists board.lists do |list|
    json.extract! list, :id, :title, :description
    json.cards list.cards do |card|
      json.extract! card, :id, :title, :description, :list
      json.members card.members do |member|
        json.extract! member, :id, :username
      end
    end
  end
end
