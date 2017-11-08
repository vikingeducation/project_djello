json.card_id @membership.card_id
json.member do 
  json.id @membership.user_id
  json.name @membership.user.full_name
  json.card_id @membership.card_id
  end