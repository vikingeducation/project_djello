require 'rails_helper'

RSpec.describe User, type: :model do

  # says it doesn't respond to has_many?
  it { should have_many(:boards) }

end
