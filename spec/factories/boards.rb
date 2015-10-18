FactoryGirl.define do
  factory :board do
    title 'Foo Board'
    association :owner
  end

end
