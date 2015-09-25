FactoryGirl.define do
  factory :board do
    sequence(:name) {|n| "Board #{n}"}
    association :user, factory: :user
  end

end
