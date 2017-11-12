activities = @card.activities.sort{ |a, b| b.created_at <=> a.created_at}

json.id @card.id
json.title @card.title
json.description @card.description
json.list_id @card.list_id
json.members @card.members do |member| 
  json.id member.id
  json.name member.full_name
  json.card_id @card.id
end

json.activities activities do |activity|
  json.id activity.id
  json.value activity.value
  json.object activity.object
  json.card_id activity.card_id
  json.user_id activity.user_id
  json.verb activity.verb 
  json.created_at activity.created_at.to_s
  end