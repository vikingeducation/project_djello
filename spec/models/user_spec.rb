require 'rails_helper'

RSpec.describe User, type: :model do

  it { should have_many(:boards) }
  it { should have_many(:lists) }
  it { should have_many(:cards) }

end
