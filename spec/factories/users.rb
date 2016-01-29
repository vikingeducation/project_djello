FactoryGirl.define do
  factory :user, aliases: [:owner, :member] do

    sequence(:email) { |n| "test#{n}@test.com" }
    password 'password'
    password_confirmation 'password'
    
  end

end
