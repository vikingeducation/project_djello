require 'rails_helper'

RSpec.describe CardMember, type: :model do

  it { should belong_to(:card) }
  it { should belong_to(:member) }

end
