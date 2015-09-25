FactoryGirl.define do
  factory :list do
    sequence(:title) {|n| "List #{n}"}
    description "Yet another list."
    association :board, factory: :board
  end

end
