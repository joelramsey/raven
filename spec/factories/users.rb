FactoryGirl.define do
  factory :user do
  	sequence(:username)   { |n| "Person #{n}" }
    sequence(:email)      { |n| "person_#{n}@example.com" }
    password "foobarfoo"
    password_confirmation "foobarfoo"
  end
end
