json.extract! @card, :id, :list_id, :title, :description, :completed, :created_at, :updated_at, :position
json.list @card.list
json.cmems @card.card_members
json.members @card.members
json.url card_url(@card.id, format: :json)