require 'rails_helper'

RSpec.describe CardMember, type: :model do

  it { should belong_to(:card) }
  it { should belong_to(:member) }

  it { is_expected.to callback(:log_member_added).after(:create) }
  it { is_expected.to callback(:log_member_removed).after(:destroy) }

end