FactoryGirl.define do
  factory :list do

    title 'New List'
    description 'Add a description'
    association :board
    
  end

end
