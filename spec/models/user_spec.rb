require 'rails_helper'

RSpec.describe User, type: :model do
  
  it { should have_many(:boards) }
  it { should have_many(:lists) }
  it { should have_many(:cards) }
  it { should have_many(:card_members).with_foreign_key('member_id') }
  it { should have_many(:assigned_cards).through(:card_members) }
  
end
