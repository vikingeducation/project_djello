FactoryGirl.define do
  factory :user do
    sequence(:username) {|n| "User #{n}"}
    password "dddddddd"
  end

end
