require 'rails_helper'

RSpec.describe Board, type: :model do

  it { should belong_to(:owner) }

end
