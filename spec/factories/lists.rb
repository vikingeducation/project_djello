FactoryGirl.define do
  factory :list do
    title 'Foo List'
    description 'List description here'
    association :board
  end

end
