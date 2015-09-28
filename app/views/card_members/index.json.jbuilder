json.array!(@card_members) do |card_member|
  json.extract! card_member, :id
  json.card card_member.card
  json.member card_member.member
  json.url card_member_url(card_member, format: :json)
end
