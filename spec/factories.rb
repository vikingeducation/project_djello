FactoryBot.define do
  factory :board_membership do
    association :user
    association :board
  end

  factory :membership do
    association :card
    association :user
  end
  factory :card do
    sequence(:title){|n| "Card title #{n}"}
    sequence(:description){|n| "Card description #{n}"}
    done false
    association :list
  end

  factory :list do
    sequence(:title){|n| "List title #{n}"}
    sequence(:description){ |n| "List description #{n}"}
    association :board
  end

  factory :board do
    sequence(:title){|n| "Board Title #{n}"}
    association :owner

    trait :no_title do
      title nil
    end
  end

  factory :user, aliases: [:owner] do
    sequence(:email){|n| "foo#{n}@bar.com"}
    password 'password'
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
  end
end
