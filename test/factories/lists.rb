FactoryGirl.define do
  factory :list do

    title 'List Title'
    description 'list description'
    association :board
    
  end

end
