FactoryBot.define do
  factory :user, aliases: [:owner] do
    sequence(:email){|n| "foo#{n}@bar.com"}
    password 'password'
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
  end
end
