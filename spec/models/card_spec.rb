require 'rails_helper'

RSpec.describe Card, type: :model do

  it { should belong_to(:list) }
  it { should have_many(:card_members) }
  it { should have_many(:members).through(:card_members) }
  it { should have_many(:card_activities) }

  it { should validate_presence_of :title }
  it { should validate_presence_of :description }

  it { is_expected.to callback(:log_card_created).after(:create) }
  it { is_expected.to callback(:log_card_updated).after(:update) }

end
