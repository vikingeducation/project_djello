json.id @card.id
json.title @card.title
json.description @card.description
json.list_id @card.list_id
json.members @card.members do |member| 
  json.id member.id
  json.name member.full_name
  json.card_id @card.id
end
json.activities @card.activities