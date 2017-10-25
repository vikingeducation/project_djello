FactoryBot.define do


  factory :membership do
    association :card
    association :user
  end
  factory :card do
    sequence(:title){|n| "Card title #{n}"}
    sequence(:description){|n| "Card description #{n}"}
    done false
    association :list
    position ""
  end

  factory :list do
    sequence(:title){|n| "List title #{n}"}
    sequence(:description){ |n| "List description #{n}"}
    association :board
  end

  factory :board do
    sequence(:title){|n| "Board Title #{n}"}
    association :owner
  end

  factory :user, aliases: [:owner] do
    sequence(:email){|n| "foo#{n}@bar.com"}
    password 'password'
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
  end
end
