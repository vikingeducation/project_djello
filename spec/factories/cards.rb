FactoryGirl.define do
  factory :card do
    sequence(:title) {|n| "Card #{n}"}
    description "Yet another card."
    completed false
  end

  factory :card_with_list, parent: :list do
    lists {[create(:list)]}
  end

end
