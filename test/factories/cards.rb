FactoryGirl.define do
  factory :card do

    title 'New Card'
    description 'Add a description'
    completed false
    association :list
    
  end

end
