json.extract! @card_member, :id, :created_at, :updated_at
json.member @card_member.member
json.card @card_member.card
