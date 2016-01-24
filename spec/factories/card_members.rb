FactoryGirl.define do
  factory :card_member do
    association :card
    association :member
  end

end
