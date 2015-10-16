require 'rails_helper'

RSpec.describe Board, type: :model do

  # undefined method again
  it { should belong_to(:owner) }

end
