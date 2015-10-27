require 'rails_helper'

RSpec.describe CardActivity, type: :model do
  it { should belong_to(:card) }
  it { should belong_to(:user) }
end
