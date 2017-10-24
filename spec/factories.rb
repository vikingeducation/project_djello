FactoryBot.define do

  factory :action do
    name "MyString"
  end
  factory :membership do
    card nil
    user nil
  end
  factory :card do
    title "MyString"
    description "MyText"
    done false
    list nil
    position ""
  end
  factory :list do
    title "MyString"
    description "MyText"
    board nil
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
