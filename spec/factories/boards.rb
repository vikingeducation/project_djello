FactoryGirl.define do
  factory :board do

    title 'Board Title'
    association :owner
    
  end

end
