json.array!(@card_members) do |card_member|
  json.extract! card_member, :id
  json.card card_member.card
  json.user card_member.user
  json.url card_member_url(card_member, format: :json)
end
