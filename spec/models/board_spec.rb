require 'rails_helper'

RSpec.describe Board, type: :model do

  it { should belong_to(:owner) }

  it { should have_many(:lists) }

  it { should validate_presence_of :title }

end
